import React, { use, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Components/Loader';
import Swal from 'sweetalert2';
import { MoreVertical, Eye, Edit, Trash2, Check, X } from 'lucide-react';


const MyDonationRequests = () => {
  const { user } = use(AuthContext);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  const { data: allRequests = [], isLoading, refetch } = useQuery({
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

  const handleStatusChange = (id, status) => {
    if (isLoading) return <Loader />
    axiosSecure.patch(`/donation-requests/${id}`, { status })
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
            <option value="Pending">Pending</option>
            <option value="Inprogress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {paginatedRequests.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center py-10">No donation requests found.</p>
      ) : (
        <div className="w-full mt-10 overflow-auto border border-primary rounded-box shadow-md mb-10">
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
                      className={`badge badge-sm badge-${req.status === 'Pending'
                        ? 'neutral'
                        : req.status === 'Inprogress'
                          ? 'warning'
                          : req.status === 'Done'
                            ? 'success'
                            : 'error'
                        }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className=" space-x-1">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                        <MoreVertical size={18} />
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 space-y-1 text-sm">
                        <li>
                          <Link to={`/dashboard/donation-details/${req._id}`} className="flex items-center gap-2">
                            <Eye size={16} /> View
                          </Link>
                        </li>

                        {(req.status === 'Inprogress') && (
                          <>
                            <li>
                              <button onClick={() => handleStatusChange(req._id, 'Done')}>
                                <Check size={16} className="mr-1" /> Mark as Done
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handleStatusChange(req._id, 'Canceled')}>
                                <X size={16} className="mr-1" /> Cancel
                              </button>
                            </li>
                          </>
                        )}

                        {(req.status !== 'Done' && req.status !== 'Canceled') && (
                          <li>
                            <Link to={`/dashboard/edit-donation/${req._id}`} className="flex items-center gap-2 ">
                              <Edit size={16} /> Edit
                            </Link>
                          </li>
                        )}

                        <li>
                          <button onClick={() => handleDelete(req._id)} className="flex items-center gap-2 text-error">
                            <Trash2 size={16} /> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
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
