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
    <div className='min-h-screen bg-slate-100/80'>
      <section className="bg-linear-to-b from-primary from-50% to-secondary py-20 px-5 lg:px-0 text-white ">
        <div className=" mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blood Donation Blog
          </h1>
          <p className="text-xl opacity-90">
            Stay informed with the latest insights, tips, and stories from the world of blood donation
          </p>
        </div>
      </section>

      <section className='max-w-screen-xl mx-auto px-5 lg:px-0 py-20'>
        <div className='grid lg:grid-cols-3 gap-5'>
          {blogs.map(blog => <div key={blog._id} className="card bg-white  hover:drop-shadow-primary/20 hover:drop-shadow-xl  shadow-md">
            <figure>
              <img
                className="h-56 w-full object-cover rounded-t-lg"
                src={blog.thumbnail}
                alt="Blog Image" />
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
      </section>
    </div>
  );
};

export default Blogs;