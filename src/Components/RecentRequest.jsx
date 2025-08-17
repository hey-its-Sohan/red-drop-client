import React from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import Error from '../Pages/Error';
import { Calendar, MapPin, Droplet, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router';

const RecentRequest = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allRequests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-donation-requests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blood-donation-requests");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  // Get the three most recent requests (last three from the ascending sorted array)
  const recentRequests = [...allRequests].slice(-3).reverse();

  const getBloodGroupColor = (bloodGroup) => {
    switch (bloodGroup.charAt(0)) {
      case "O":
        return "bg-red-100 text-red-800 border-red-200";
      case "A":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "B":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "AB":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className=' bg-slate-100/80'>
      <section className='max-w-screen-xl mx-auto px-5 lg:px-0 py-10'>
        <div >
          <div className='mb-10'>
            <h3 className="text-3xl lg:text-4xl text-center font-bold mb-4">Recent Requests</h3>
            <p className="text-lg text-gray-500 text-center">
              Urgent needs in your community – your donation could save a life today
            </p>
          </div>
          {recentRequests.length === 0 ? (
            <p className="text-gray-500">No recent requests found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRequests.map((request) => (
                <div
                  key={request._id}
                  className={`card bg-white shadow-md hover:shadow-xl hover:shadow-primary/20 border-l-4 ${request.requestStatus === "urgent"
                    ? "border-error"
                    : "border-primary"
                    } `}
                >
                  <div className="card-body space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-secondary">
                          {request.recipientName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {request.hospital || "Unknown Hospital"}
                        </p>
                      </div>
                      {request.requestStatus === "urgent" && (
                        <div className="badge badge-error animate-pulse text-xs">
                          Urgent
                        </div>
                      )}
                    </div>

                    {/* Blood Group */}
                    <div className="flex justify-center">
                      <div
                        className={`text-2xl font-bold py-3 px-6 rounded-lg border-2 ${getBloodGroupColor(
                          request.bloodGroup
                        )}`}
                      >
                        {request.bloodGroup}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span>
                          {request.upazila}, {request.district}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        <span>{request.donationDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        <span>{request.donationTime}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <Link
                      to={`/donation-request/${request._id}`}
                      className={`btn w-full ${request.requestStatus === "urgent"
                        ? "btn-error text-white"
                        : "btn-outline btn-primary"
                        }`}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to={'/blood-donation-request'} className='flex justify-center'>
            <button className='btn btn-primary text-white mt-7 '>View All Requests</button>
          </Link>
        </div>
      </section>
    </div>
  );
};


export default RecentRequest;