import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';


const MyDonationRequests = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  const { data: allRequests = [], isLoading } = useQuery({
    queryKey: ['my-donation-requests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-primary">My Donation Requests</h2>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="label font-medium">Filter by Status: </label>
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
        <p className="text-gray-500">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Donation Date</th>
                <th>Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td>
                    <span className={`badge badge-${req.status === 'pending'
                        ? 'neutral'
                        : req.status === 'inprogress'
                          ? 'primary'
                          : req.status === 'done'
                            ? 'success'
                            : 'error'
                      }`}>{req.status}</span>
                  </td>
                  <td>
                    {req.status === 'inprogress' ? (
                      <div>
                        <p>{req.donorName}</p>
                        <p className="text-sm text-gray-500">{req.donorEmail}</p>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="space-x-1">
                    {req.status === 'inprogress' && (
                      <>
                        <button className="btn btn-xs btn-success">Done</button>
                        <button className="btn btn-xs btn-error">Cancel</button>
                      </>
                    )}
                    {(req.status !== 'done' && req.status !== 'canceled') && (
                      <Link to={`/dashboard/edit-donation/${req._id}`} className="btn btn-xs btn-warning">
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
              className={`join-item btn ${currentPage === i + 1 ? 'btn-primary text-white' : ''}`}
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
