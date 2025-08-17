import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Calendar, Clock, Eye, ArrowUpDown } from "lucide-react";
import { Link } from "react-router";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Loader from "../Components/Loader";
import Error from "./Error";

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

const BloodDonationRequest = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOption, setSortOption] = useState("newest"); // 'newest', 'oldest', 'urgent'

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

  // Sort the requests based on the selected option
  const sortedRequests = [...allRequests].sort((a, b) => {
    const now = new Date();

    const dateA = new Date(`${a.donationDate}T${a.donationTime}:00`);
    const dateB = new Date(`${b.donationDate}T${b.donationTime}:00`);

    const isFutureA = dateA >= now;
    const isFutureB = dateB >= now;

    // Upcoming requests always come before past requests
    if (isFutureA && !isFutureB) return -1;
    if (!isFutureA && isFutureB) return 1;

    // Both upcoming
    if (isFutureA && isFutureB) {
      if (sortOption === "newest") return dateA - dateB; // soonest first
      if (sortOption === "oldest") return dateB - dateA; // farthest first
    }

    // Both past
    if (!isFutureA && !isFutureB) {
      if (sortOption === "newest") return dateB - dateA; // most recent past first
      if (sortOption === "oldest") return dateA - dateB; // oldest past first
    }

    return 0;
  });


  if (isLoading) return <Loader />;
  if (isError) return <Error />

  return (
    <div className="min-h-screen bg-slate-100/80">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary from-50% to-secondary py-20 px-5 lg:px-0 text-white ">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blood Donation Requests
          </h1>
          <p className="text-xl opacity-90">
            Help save lives by responding to urgent blood donation requests in
            your area
          </p>
        </div>
      </section>

      {/* Requests Grid */}
      <section className="py-16 px-5 lg:px-0 max-w-screen-xl mx-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">
                Pending Requests
              </h2>
              <p className="text-gray-500">
                {sortedRequests.length} requests need your help
              </p>
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2">
              <span className=" font-semibold text-gray-500">Sort by:</span>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline btn-primary">
                  <ArrowUpDown className="w-4 h-4 mr-1" />
                  {sortOption === "newest" && "Newest First"}
                  {sortOption === "oldest" && "Oldest First"}

                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                >
                  <li>
                    <button onClick={() => setSortOption("newest")}>Newest First</button>
                  </li>
                  <li>
                    <button onClick={() => setSortOption("oldest")}>Oldest First</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {sortedRequests.length === 0 ? (
            <p className="text-center text-gray-500">
              No pending requests found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRequests.map((request) => (
                <div
                  key={request._id}
                  className={`card bg-white shadow-md hover:shadow-xl hover:shadow-primary/20 border-l-4 ${request.requestStatus === "urgent"
                    ? "border-error"
                    : "border-primary"
                    }`}
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

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="card bg-gradient-to-t from-primary from-50% to-secondary px-5 lg:px-0 text-white shadow-md max-w-2xl mx-auto">
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-4">
                  Can't find a matching request?
                </h3>
                <p className="mb-4 opacity-90">
                  Register as a donor to get notified when your blood type is
                  needed in your area.
                </p>
                <Link to="/sign-up" className="btn hover:-translate-y-1 btn-secondary text-white">
                  Register as Donor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodDonationRequest;