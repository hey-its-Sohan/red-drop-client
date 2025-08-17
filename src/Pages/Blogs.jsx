import React from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Components/Loader';
import { AlignRightIcon, CalendarDays, Clock, MoveRight, MoveRightIcon, User } from 'lucide-react';
import { Link } from 'react-router';

const Blogs = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blog-page');
      // Filter out draft blogs before displaying
      return res.data.filter(blog => blog.status !== 'Draft');
    },
  });

  if (isLoading) return <Loader />;

  // Function to extract plain text from HTML for excerpt
  const getTextExcerpt = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className='min-h-screen bg-slate-100/80'>
      <section className="bg-gradient-to-b from-primary to-secondary py-20 px-5 lg:px-0 text-white">
        <div className="mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blood Donation Blog
          </h1>
          <p className="text-xl opacity-90">
            Stay informed with the latest insights, tips, and stories from the world of blood donation
          </p>
        </div>
      </section>

      <section className='max-w-screen-xl mx-auto px-5 lg:px-0 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/20 border border-gray-100 flex flex-col"
            >
              {/* Thumbnail with fallback */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  src={blog.thumbnail}
                  alt={blog.title}
                />
              </div>

              {/* Blog content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h2>

                {/* Excerpt - now using plain text extraction */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {getTextExcerpt(blog.content).substring(0, 150)}...
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto pt-3 border-t border-gray-100">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Read more button */}
                <Link
                  to={`/blogs-details/${blog._id}`}
                  className="mt-4 flex items-center font-medium text-primary hover:text-primary/80 transition-colors group"
                >
                  Read full article
                  <MoveRightIcon className="h-4 w-4 ml-1 mt-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blogs;