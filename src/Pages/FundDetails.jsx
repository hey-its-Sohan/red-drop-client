import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GiveFundModal from '../Components/GiveFundModal';
import Loader from '../Components/Loader';
import { AuthContext } from '../Contexts/AuthContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const FundDetailsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { user } = React.useContext(AuthContext);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['funds', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/funds`);
      return res.data;
    },
    enabled: !!user, // Only fetch when user is available
  });

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error('Failed to fetch funds');
    return null;
  }

  const { funds, totalPages } = data;

  return (
    <div className="max-w-screen-xl mx-auto px-5 lg:px-0 min-h-screen py-7">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl lg:text-4xl mb-5 font-bold text-primary">All Donations</h2>
        <button
          className="btn btn-primary text-white text-lg flex items-center gap-2"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={16} /> Give Fund
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr className="text-base font-medium">
              <th>#</th>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, i) => (
              <tr key={fund._id}>
                <td>{(page - 1) * 10 + i + 1}</td>
                <td>{fund.userName}</td>
                <td className="text-success font-semibold">${fund.amount}</td>
                <td>{new Date(fund.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center flex-wrap gap-2">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n + 1)}
            className={`btn text-white btn-sm ${page === n + 1 ? 'btn-primary' : 'btn-outline'}`}
          >
            {n + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {openModal && (
        <Elements stripe={stripePromise}>
          <GiveFundModal closeModal={() => setOpenModal(false)} refetchFunds={refetch} />
        </Elements>
      )}
    </div>
  );
};

export default FundDetailsPage;
