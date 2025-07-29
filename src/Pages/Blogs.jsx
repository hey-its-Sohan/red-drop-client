import React from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Components/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const Blogs = () => {


  const axiosPublic = useAxiosPublic()

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blog-page');
      return res.data;
    },
  });


  if (isLoading) return <Loader />
  console.log('the blogs', blogs);



  return (
    <div className='max-w-screen-xl py-10 min-h-screen mx-auto px-5 lg:px-0'>
      <div className='grid lg:grid-cols-3 gap-5'>
        {blogs.map(blog => <div key={blog._id} className="card bg-white  shadow-md">
          <figure>
            <img
              className="h-56 w-full object-cover rounded-t-lg"
              src={blog.thumbnail}
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{blog.title}</h2>
            <div
              className="line-clamp-3 mb-2 text-gray-500"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
            <div className="card-actions  justify-end">
              <Link to={`/blogs-details/${blog._id}`}><button className="btn btn-primary text-white">Read Now</button></Link>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default Blogs;