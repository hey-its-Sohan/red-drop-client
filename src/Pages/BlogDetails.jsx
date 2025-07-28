import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useParams } from 'react-router';
import Loader from '../Components/Loader';

const BlogDetails = () => {

  const { id } = useParams();
  const axiosPublic = useAxiosPublic()

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog-details', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blog-details/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <Loader />


  return (
    <div className='max-w-screen-xl mx-auto px-5 lg:px-0 min-h-screen py-10'>
      <h1 className='text-4xl font-bold mb-7'>{blog.title}</h1>
      <div>
        <img
          className='w-2/5 mx-auto mb-7'
          src={blog.thumbnail} alt="" />
      </div>
      <div
        className=" mb-2"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;