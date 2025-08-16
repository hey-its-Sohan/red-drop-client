import React, { useState } from 'react';
import { Plus, DollarSign, TrendingUp, User } from 'lucide-react';
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
      const res = await axiosSecure.get('/funds');
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error('Failed to fetch funds');
    return <Loader />;
  }

  const { funds, totalPages } = data;

  return (
    <div className=" min-h-screen bg-slate-100/80">
      <section className="bg-linear-to-b from-primary from-50% to-secondary py-20 px-5 lg:px-0 text-white ">
        <div className=" mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Give Back to Community
          </h1>
          <p className="text-xl opacity-90">
            Support our mission to save lives through financial contributions and help us expand our reach
          </p>
          <button
            className="btn btn-secondary mt-3 mx-auto text-white text-lg flex items-center gap-2"
            onClick={() => setOpenModal(true)}
          >
            <Plus size={16} /> Give Fund
          </button>
        </div>
      </section>

      <section className='max-w-screen-xl mx-auto py-16 px-5 lg:px-0'>
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl lg:text-4xl mb-5 font-bold text-primary">All Fund Donations</h2>
            <p className="text-gray-500 mb-6">
              Help us continue saving lives through your generous support. Together, we're making a difference— <br /> one drop, one donation at a time.
            </p>
          </div>
          <button
            className="btn btn-primary text-white text-lg flex items-center gap-2"
            onClick={() => setOpenModal(true)}
          >
            <Plus size={16} /> Give Fund
          </button>
        </div>

        <div className="overflow-x-auto border border-primary/20 rounded-lg shadow-md bg-white">
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
      </section>

      <section className="pb-16 ">
        <div className="max-w-screen-xl mx-auto px-5 lg:px-0">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Impact</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              See how your contributions are making a difference in our community
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card bg-white shadow-lg text-center">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Emergency Fund</h3>
                <p className="text-base-content/70">
                  Your donations help us respond quickly to urgent medical needs in our community
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-white shadow-lg text-center">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Equipment & Supplies</h3>
                <p className="text-base-content/70">
                  Fund advanced medical equipment and supplies for better blood collection and storage
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-white shadow-lg text-center">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Outreach</h3>
                <p className="text-base-content/70">
                  Support awareness campaigns and educational programs to increase blood donation rates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FundDetailsPage;
