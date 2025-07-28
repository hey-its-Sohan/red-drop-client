import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loader from '../Components/Loader';
import useUserRole from '../Hooks/useUserRole';
import { MoreVertical, Eye, Pencil, Trash2, Check, X } from 'lucide-react';
import Swal from 'sweetalert2';

const AllBloodRequest = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole()

  const { data: allRequests = [], isLoading, refetch } = useQuery({
    queryKey: ['all-donation-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-donation-requests');
      return res.data;
    },
  });

  const handleMarkAsDone = async (id) => {
    await axiosSecure.patch(`/donation-requests/${id}`, { status: 'Done' });
    refetch();
  };

  const handleCancelRequest = async (id) => {
    await axiosSecure.patch(`/donation-requests/${id}`, { status: 'Canceled' });
    refetch();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/donation-requests/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'The donation request has been deleted.', 'success');
          refetch();

        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };



  if (isLoading) return <Loader />;

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
    <div className="max-w-screen-xl mx-auto px-3 md:px-5 lg:px-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">All Blood Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start md:items-center">
          <label className="label font-medium">Filter by Status:</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Inprogress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {paginatedRequests.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No donation requests found.</p>
      ) : (
        <div className="w-full overflow-auto border border-primary rounded-box shadow-md mb-10">
          <table className="table min-w-full text-sm">
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
              {paginatedRequests.map((req, index) => {

                const statusColorMap = {
                  Pending: 'neutral',
                  Inprogress: 'warning',
                  Done: 'success',
                  Canceled: 'error',
                };
                const badgeColor = statusColorMap[req.status] || 'default';
                return (
                  (
                    <tr key={req._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{req.recipientName}</td>
                      <td>{req.district}, {req.upazila}</td>
                      <td>{req.donationDate}</td>
                      <td>{req.donationTime}</td>
                      <td>{req.bloodGroup}</td>
                      <td>
                        <span className={`badge badge-sm badge-${badgeColor}`}>
                          {req.status}
                        </span>
                      </td>
                      <td>
                        {req.status === 'Inprogress' ? (
                          <div>
                            <p>{req.donorName}</p>
                            <p className="text-xs text-gray-500">{req.donorEmail}</p>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="">
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                            <MoreVertical size={18} />
                          </div>
                          <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-48 space-y-1">
                            <li>
                              <Link to={`/dashboard/donation-details/${req._id}`} className="flex hover:bg-red-100 items-center gap-2">
                                <Eye className="w-4 h-4" />
                                View Details
                              </Link>
                            </li>

                            {(req.status !== 'Done' && req.status !== 'Canceled' && role === 'admin') && (
                              <li>
                                <Link to={`/dashboard/edit-donation/${req._id}`} className="flex hover:bg-red-100 items-center gap-2">
                                  <Pencil className="w-4 h-4" />
                                  Edit Request
                                </Link>
                              </li>
                            )}

                            {req.status === 'Inprogress' && (
                              <>
                                <li>
                                  <button onClick={() => handleMarkAsDone(req._id)} className="flex hover:bg-red-100 items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Mark as Done
                                  </button>
                                </li>
                                <li>
                                  <button onClick={() => handleCancelRequest(req._id)} className="flex hover:bg-red-100 items-center gap-2">
                                    <X className="w-4 h-4 text-red-500" />
                                    Cancel Request
                                  </button>
                                </li>
                              </>
                            )}

                            {role === 'admin' && (
                              <li>
                                <button onClick={() => handleDelete(req._id)} className="flex hover:bg-red-100 items-center gap-2 text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>

                    </tr>
                  )
                )
              })}
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

export default AllBloodRequest;
