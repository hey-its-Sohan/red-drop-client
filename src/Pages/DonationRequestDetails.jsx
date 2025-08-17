import React, { useState, useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import { User, Mail, CalendarClock } from 'lucide-react';
import Loader from '../Components/Loader';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const { data: request, isLoading } = useQuery({
    queryKey: ['donation-request', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const donorName = user.displayName
      const donorEmail = user.email
      const res = await axiosSecure.patch(`/donation-requests/${id}`, { status: 'Inprogress', donorName: donorName, donorEmail: donorEmail });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Donation confirmed!');
      queryClient.invalidateQueries(['donation-request', id]);
      setShowModal(false);
    },
    onError: () => {
      toast.error('Failed to update status');
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className='bg-slate-100/80'>
      <div className="max-w-screen-xl mx-auto min-h-screen px-4 py-10">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-primary mb-2">Donation Request Details</h2>
          <p className="text-gray-600">Here are all the details regarding the donation request.</p>
        </div>

        <div className="bg-white hover:shadow-primary/10 hover:shadow-xl rounded-xl shadow-md p-6 border-l-4  border-primary grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="md:col-span-2 text-lg"><span className="font-semibold">Message:</span> {request.message}</div>
          <div className="md:col-span-2 text-lg">
            <span className="font-semibold">Status:</span>
            <span className={`ml-2 badge ${request.status === 'Pending' ? 'badge-warning' : 'badge-info'}`}>
              {request.status}
            </span>
          </div>
        </div>

        {request.status === 'Pending' && (
          <div className='mt-8'>
            {
              !user && <p className='text-primary font-semibold text-sm'>*Login to Donate Blood</p>

            }
            {
              user ? <button
                className="mt-3 font-semibold px-6 py-3 btn btn-primary text-white shadow-md "
                onClick={() => setShowModal(true)}
              >
                Donate Now
              </button> :
                <button
                  disabled
                  className="mt-3 font-semibold px-6 py-3 btn btn-primary text-white shadow-md "
                  onClick={() => setShowModal(true)}
                >
                  Donate Now
                </button>
            }
          </div>
        )}

        {/* DaisyUI Modal */}
        {showModal && (
          <>
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-xl text-primary border-b pb-2 mb-4">Confirm Donation</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                  }}
                  className="grid gap-4"
                >
                  <div className="flex items-center gap-3">
                    <User className="text-primary" />
                    <input
                      type="text"
                      value={user?.displayName || ''}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="text-primary" />
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="modal-action mt-6">
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost">
                      Cancel
                    </button>
                    <button type="submit" className="btn bg-primary text-white">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationRequestDetails;
