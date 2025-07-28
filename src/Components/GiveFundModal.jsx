import React, { use, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';

const GiveFundModal = ({ closeModal, refetchFunds }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState('');
  const { user } = use(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe not loaded yet");
      return;
    }

    try {

      const { data: { clientSecret } = {} } = await axiosSecure.post('/create-payment-intent', { amount });

      if (!clientSecret) {
        toast.error("No client secret returned");
        console.error("Client secret missing in response");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        toast.error("Card element not loaded");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'Anonymous Donor' },
        },
      });

      if (result.error) {
        console.error("Stripe error:", result.error);
        toast.error(result.error.message || "Payment error occurred");
      } else if (result.paymentIntent.status === 'succeeded') {
        await axiosSecure.post('/funds', {
          amount,
          userName: user?.displayName || 'Anonymous Donor',
          date: new Date(),
        });
        toast.success("Fund Donated Successfully");
        refetchFunds();
        closeModal();
      } else {
        toast.error("Unexpected Stripe response");
        console.warn("Unexpected result:", result);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed");
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-xl relative">
        <h3 className="text-xl font-semibold mb-4">Give Fund</h3>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {/* Hidden dummy input to prevent autofill */}
          <input type="text" name="prevent_autofill" autoComplete="off" className="hidden" />

          <input
            type="number"
            name="donation-amount"
            autoComplete="off"
            className="input input-bordered w-full"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="p-2 border rounded-md">
            <CardElement />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white btn-primary"
              disabled={!stripe || !elements}
            >
              Donate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveFundModal;
