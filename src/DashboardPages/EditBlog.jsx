import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const EditBlog = () => {
  const { id } = useParams(); // get blog id from URL
  const editor = useRef(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosSecure.get(`/blogs-details/${id}`);
        const blog = res.data;

        setTitle(blog.title);
        setThumbnailUrl(blog.thumbnail);
        setContent(blog.content);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch blog data.');
      }
    };

    fetchBlog();
  }, [id, axiosSecure]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !thumbnailUrl) {
      return toast.error('All fields are required!');
    }

    try {
      setLoading(true);

      const blogData = {
        title,
        thumbnail: thumbnailUrl,
        content,
        status: 'Draft', // keep as draft
        updatedAt: new Date(),
      };

      await axiosSecure.put(`/edit-blogs/${id}`, blogData);

      toast.success('Blog updated successfully!');
      navigate('/dashboard/content-management');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-5 text-primary">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label font-medium">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Thumbnail URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={setContent}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary text-white"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
