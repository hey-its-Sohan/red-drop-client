import React, { use, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Components/Loader';


const MyDonationRequests = () => {
  const { user } = use(AuthContext);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  const { data: allRequests = [], isLoading } = useQuery({
    queryKey: ['my-donation-requests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation-requests/${user?.email}`);
      console.log('donation request data', res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />

  const filteredRequests =
    statusFilter === 'all'
      ? allRequests
      : allRequests.filter((req) => req.status === statusFilter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className=" max-w-screen-xl mx-auto px-3 md:px-5 lg:px-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">My Donation Requests</h2>

      <div className="mb-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start md:items-center">
          <label className="label font-medium">Filter by Status:</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {paginatedRequests.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No donation requests found.</p>
      ) : (
        <div className="w-full overflow-auto border border-primary rounded-box shadow-md mb-10">
          <table className="table min-w-full  text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Donor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.district}, {req.upazila}
                  </td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td>
                    <span
                      className={`badge badge-sm badge-${req.status === 'pending'
                        ? 'neutral'
                        : req.status === 'inprogress'
                          ? 'primary'
                          : req.status === 'done'
                            ? 'success'
                            : 'error'
                        }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td >
                    {req.status === 'inprogress' ? (
                      <div>
                        <p>{req.donorName}</p>
                        <p className="text-xs text-gray-500">{req.donorEmail}</p>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className=" space-x-1">
                    {req.status === 'inprogress' && (
                      <>
                        <button className="btn btn-xs btn-success">Done</button>
                        <button className="btn btn-xs btn-error">Cancel</button>
                      </>
                    )}
                    {(req.status !== 'done' && req.status !== 'canceled') && (
                      <Link
                        to={`/dashboard/edit-donation/${req._id}`}
                        className="btn btn-xs btn-warning"
                      >
                        Edit
                      </Link>
                    )}
                    <button className="btn btn-xs btn-outline btn-error">Delete</button>
                    <Link to={`/dashboard/donation-details/${req._id}`} className="btn btn-xs btn-info">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="join">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-primary text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
