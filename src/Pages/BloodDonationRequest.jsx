import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Droplet, Calendar, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loader from '../Components/Loader';

const BloodDonationRequest = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pendingRequests = [], isLoading, isError } = useQuery({
    queryKey: ['pending-donation-requests'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blood-donation-requests');
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center py-20 text-red-500">Something went wrong!</p>;

  return (
    <div className="px-5 max-w-screen-xl mx-auto py-10 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Pending Blood Donation Requests
      </h2>

      {pendingRequests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
          {pendingRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white border border-primary rounded-2xl shadow-sm p-6 hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105  "
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {request.recipientName}
              </h3>

              <div className="flex items-center  text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <h3><span className='font-medium text-black'>Location:</span> {request.upazila}, {request.district}</h3>
              </div>

              <div className="flex items-center  text-gray-600 mb-1">
                <Droplet className="w-4 h-4 mr-2 text-red-500" />
                <h3 className='font-medium text-black'> Blood Group: <span className="font-medium text-red-600">{request.bloodGroup}</span></h3>
              </div>

              <div className="flex items-center  text-gray-600 mb-1">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <h3><span className='font-medium text-black'>Date:</span> {request.donationDate}</h3>
              </div>

              <div className="flex items-center  text-gray-600 mb-4">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <h3><span className='font-medium text-black'>Time:</span> {request.donationTime}</h3>
              </div>

              <Link
                to={`/donation-request/${request._id}`}
                className="inline-flex items-center gap-2  px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
              >
                <Eye className="w-4 h-4" />
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodDonationRequest;
