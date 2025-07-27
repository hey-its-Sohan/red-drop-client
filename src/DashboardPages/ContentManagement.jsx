import React, { use, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import useUserRole from '../Hooks/useUserRole';

const ContentManagement = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const { role } = useUserRole()

  const { data: blogs = [], isLoading, refetch } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs');
      return res.data;
    },
  });

  const filteredBlogs =
    filter === 'all' ? blogs : blogs.filter((blog) => blog.status === filter);

  const handlePublish = async (id) => {
    try {
      await axiosSecure.patch(`/blogs/publish/${id}`);
      toast.success('Blog published');
      refetch();
    } catch (error) {
      toast.error('Failed to publish blog');
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await axiosSecure.patch(`/blogs/unpublish/${id}`);
      toast.info('Blog unpublished');
      refetch();
    } catch (error) {
      toast.error('Failed to unpublish blog');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/blogs/${id}`);
          toast.success('Blog deleted successfully');
          refetch();
        } catch (error) {
          toast.error('Failed to delete blog');
        }
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-blog/${id}`);
  };

  const isAdmin = role === 'admin';

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold text-primary">Content Management</h2>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <select
            className="select select-bordered max-w-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            className="btn btn-primary text-white"
            onClick={() => navigate('/dashboard/add-blog')}
          >
            Add Blog
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="card bg-base-100 shadow-lg border border-gray-200">
              {blog.image && (
                <figure>
                  <img src={blog.image} alt="Blog" className="h-48 w-full object-cover rounded-t-lg" />
                </figure>
              )}
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p className="text-sm text-gray-600">{blog.excerpt}</p>

                {blog.status === 'published' ? <div className="badge badge-success">{blog.status}</div> :
                  <div className="badge badge-neutral">{blog.status}</div>}

                {isAdmin && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.status === 'draft' ? (
                      <button className="btn btn-sm btn-success" onClick={() => handlePublish(blog._id)}>
                        Publish
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-warning" onClick={() => handleUnpublish(blog._id)}>
                        Unpublish
                      </button>
                    )}
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(blog._id)}>
                      <Trash2 size={16} /> Delete
                    </button>
                    <button className="btn btn-sm btn-outline" onClick={() => handleEdit(blog._id)}>
                      <Pencil size={16} /> Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
