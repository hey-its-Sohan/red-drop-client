import React, { use, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import axios from 'axios';
import { Eye, Edit, MoreVertical, Trash2, Check, X, Users, Droplet, HandCoins } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Components/Loader';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useUserRole from '../Hooks/useUserRole';
import Swal from 'sweetalert2';

const DashboardHome = () => {
  const { user, loading } = use(AuthContext);
  const [donationRequests, setDonationRequests] = useState([]);
  const [stats, setStats] = useState({ users: 0, funds: 0, requests: 0 });
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  const { role, isLoading } = useUserRole();

  useEffect(() => {

    if (!user || loading) return;
    console.log('my user', user);
    console.log(role);

    if (user?.email && role === 'donor') {
      axiosSecure.get(`/my-donation-requests/${user?.email}`)
        .then(res => {
          console.log('this is data', res.data);
          setDonationRequests(res.data.slice(0, 3));
        });
    }
    if (role === 'admin' || role === 'volunteer') {
      axiosSecure.get('/dashboard-stats').then(res => setStats(res.data));
    }

  }, [user?.email, role, loading]);

  if (loading || isLoading) return <Loader />

  // const handleStatusChange = (id, status) => {
  //   if (loading || isLoading) return <Loader />
  //   axios.patch(`/api/donation-requests/${id}`, { status })
  //     .then(() => {
  //       setDonationRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
  //     });
  // };



  // const handleDelete = async (id) => {
  //   const result = await Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You won\'t be able to revert this!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, delete it!'
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       const res = await axiosSecure.delete(`/donation-requests/${id}`);
  //       if (res.data.deletedCount > 0) {
  //         Swal.fire('Deleted!', 'The donation request has been deleted.', 'success')
  //           .then(() => setDonationRequests(prev => prev.filter(req => req._id !== id)));

  //       }
  //     } catch (err) {
  //       console.error(err);
  //       Swal.fire('Error!', 'Something went wrong.', 'error');
  //     }
  //   }
  // };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold text-primary">Welcome, {user?.displayName || 'User'}!</h1>

      {/* Admin & Volunteer Stats */}
      {(role === 'admin' || role === 'volunteer') && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-primary text-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <Users size={40} />
            <div>
              <p className="text-2xl font-bold">{stats.users}</p>
              <p>Total Donors</p>
            </div>
          </div>
          <div className="bg-secondary text-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <HandCoins size={40} />
            <div>
              <p className="text-2xl font-bold">${stats.totalFund}</p>
              <p>Total Funds</p>
            </div>
          </div>
          <div className="bg-accent text-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <Droplet size={40} />
            <div>
              <p className="text-2xl font-bold">{stats.requests}</p>
              <p>Blood Requests</p>
            </div>
          </div>
        </div>
      )}

      {/* Donor's Recent Requests */}
      {role === 'donor' && donationRequests.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Your Recent Donation Requests</h2>
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood Group</th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {donationRequests.map(req => (
                <tr key={req._id}>
                  <td>{req.recipientName}</td>
                  <td>{req.district}, {req.upazila}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td className="capitalize">{req.status}</td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-4">
            <button onClick={() => navigate('/dashboard/my-donation-requests')} className="btn btn-outline btn-primary">View My All Requests</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
