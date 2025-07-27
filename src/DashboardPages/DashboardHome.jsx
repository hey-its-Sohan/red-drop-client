import React, { use, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import axios from 'axios';
import { Eye, Edit, Trash2, Check, X, Users, Droplet, HandCoins } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Components/Loader';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useUserRole from '../Hooks/useUserRole';

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
      axios.get('/api/dashboard-stats').then(res => setStats(res.data));
    }
  }, [user?.email, role, loading]);

  if (loading || isLoading) return <Loader />

  const handleStatusChange = (id, status) => {
    axios.patch(`/api/donation-requests/${id}`, { status })
      .then(() => {
        setDonationRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this donation request?')) {
      axios.delete(`/api/donation-requests/${id}`)
        .then(() => setDonationRequests(prev => prev.filter(req => req._id !== id)));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {role === 'donor' && (
        <div className="mt-4 text-sm">
          <p className="text-gray-600">Fetched: {donationRequests.length} requests</p>
        </div>
      )}
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
              <p className="text-2xl font-bold">${stats.funds}</p>
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
                <th>Donor Info</th>
                <th>Actions</th>
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
                  <td>
                    {req.status === 'inprogress' && (
                      <div>
                        <p>{req.donorName}</p>
                        <p className="text-sm text-gray-500">{req.donorEmail}</p>
                      </div>
                    )}
                  </td>
                  <td className="space-x-2">
                    {req.status === 'inprogress' && (
                      <>
                        <button onClick={() => handleStatusChange(req._id, 'done')} className="btn btn-sm btn-success"><Check size={16} /></button>
                        <button onClick={() => handleStatusChange(req._id, 'canceled')} className="btn btn-sm btn-error"><X size={16} /></button>
                      </>
                    )}
                    <button onClick={() => navigate(`/edit-donation/${req._id}`)} className="btn btn-sm btn-info"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-warning"><Trash2 size={16} /></button>
                    <button onClick={() => navigate(`/donation/${req._id}`)} className="btn btn-sm btn-primary"><Eye size={16} /></button>
                  </td>
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
