import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import { User, Mail, CalendarClock } from 'lucide-react';
import Loader from '../Components/Loader';

const MyRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);


  const { data: request, isLoading } = useQuery({
    queryKey: ['donation-request', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto min-h-screen px-4 py-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary mb-2">Donation Request Details</h2>
        <p className="text-gray-600">Here are all the details regarding the donation request.</p>
      </div>

      <div className="bg-white  rounded-xl shadow-md p-6 border border-primary grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='text-lg'><span className="font-semibold">Requester:</span> {request.requesterName}</div>
        <div className='text-lg'><span className="font-semibold">Recipient:</span> {request.recipientName}</div>
        <div className='text-lg'><span className="font-semibold">Email:</span> {request.requesterEmail}</div>
        <div className='text-lg'><span className="font-semibold">Blood Group:</span> <span className="text-red-500 font-bold text-lg">{request.bloodGroup}</span></div>
        <div className='text-lg'><span className="font-semibold">District:</span> {request.district}</div>
        <div className='text-lg'><span className="font-semibold">Upazila:</span> {request.upazila}</div>
        <div className='text-lg'><span className="font-semibold">Hospital:</span> {request.hospital}</div>
        <div className='text-lg'><span className="font-semibold">Address:</span> {request.address}</div>
        <div className='text-lg'><span className="font-semibold">Date:</span> {request.donationDate}</div>
        <div className='text-lg'><span className="font-semibold">Time:</span> {request.donationTime}</div>
        {request.donorName && <><div className='text-lg'><span className="font-semibold">Donor Name:</span> {request.donorName}</div>
          <div className='text-lg'><span className="font-semibold">Donor Email:</span> {request.donorEmail}</div></>}
        <div className="md:col-span-2 text-lg"><span className="font-semibold">Message:</span> {request.message}</div>
        <div className="md:col-span-2 text-lg">
          <span className="font-semibold">Status:</span>
          <span className={`ml-2 badge ${request.status === 'Pending' ? 'badge-warning' : 'badge-success'}`}>
            {request.status}
          </span>
        </div>
      </div>

      <Link to={'/dashboard/my-donation-requests'}>
        <button
          className="mt-8 font-semibold px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 shadow-md transition"
        >
          Back
        </button></Link>
    </div>
  );
};

export default MyRequestDetails;