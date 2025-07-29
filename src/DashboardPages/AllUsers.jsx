import React, { use, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { MoreVertical } from 'lucide-react';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
import userProfile from '../assets/userProfile.PNG'
import { AuthContext } from '../Contexts/AuthContext';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext)

  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // Mutations
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`/users/status/${id}`, { status }),
    onSuccess: (_, variables) => {
      toast.success(`User ${variables.status === 'blocked' ? 'Blocked' : 'Unblocked'} Successfully`);
      queryClient.invalidateQueries(['all-users'])
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => axiosSecure.patch(`/users/role/${id}`, { role }),
    onSuccess: (_, variables) => {
      toast.success(`User promoted to ${variables.role}`);
      queryClient.invalidateQueries(['all-users'])
    }
  });

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers =
    statusFilter === 'all' ? users : users.filter(user => user.status === statusFilter);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-screen-xl mx-auto px-3 md:px-5 lg:px-0">
      <h2 className="text-2xl font-bold text-primary mb-4">All Users</h2>

      <div className="mb-4 flex gap-3 items-center">
        <label className="label font-semibold">Filter by Status:</label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-auto border border-primary rounded-box shadow-md mb-10">
        <table className="table min-w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u, index) => (
              <tr key={u._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={u.photoURL || userProfile} alt="user avatar" />
                    </div>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  <span className={`badge badge-${u.status === 'active' ? 'success' : 'error'}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown dropdown-left">
                    {
                      user.email !== u.email && <label tabIndex={0} className="btn btn-sm btn-ghost">
                        <MoreVertical size={18} />
                      </label>
                    }

                    {
                      user.email !== u.email && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44">

                        {u.status === 'active' ? (
                          <li>
                            <button className="hover:bg-red-100" onClick={() => updateStatusMutation.mutate({ id: u._id, status: 'blocked' })}>
                              Block
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button className="hover:bg-red-100" onClick={() => updateStatusMutation.mutate({ id: u._id, status: 'active' })}>
                              Unblock
                            </button>
                          </li>
                        )}

                        {(u.role !== 'volunteer') ? (
                          <li><button className=' hover:bg-red-100' onClick={() => updateRoleMutation.mutate({ id: u._id, role: 'volunteer' })}>Make Volunteer</button></li>
                        ) : <li><button className=' hover:bg-red-100' onClick={() => updateRoleMutation.mutate({ id: u._id, role: 'donor' })}>Make Donor</button></li>}
                        {(u.role !== 'admin') && (
                          <li><button className=' hover:bg-red-100' onClick={() => updateRoleMutation.mutate({ id: u._id, role: 'admin' })}>Make Admin</button></li>
                        )}
                      </ul>
                    }

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
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

export default AllUsers;
