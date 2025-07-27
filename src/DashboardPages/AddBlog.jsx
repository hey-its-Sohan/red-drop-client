import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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
        status: 'draft', // default
        createdAt: new Date(),
      };

      await axiosSecure.post('/blogs', blogData);
      toast.success('Blog created successfully!');
      navigate('/dashboard/content-management');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-5 text-primary">Add New Blog</h2>

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
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
