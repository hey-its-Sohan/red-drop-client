import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import bannerIMG from '../assets/bannerIMG.JPG'

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-5"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Give Blood, Save Lives
          </h1>
          <p className="text-lg md:text-xl">
            Be a real-life hero. Join our life-saving blood donation community today and make a difference.
          </p>
          <button
            onClick={() => navigate('/dashboard/create-donation-request')}
            className="btn btn-secondary text-white px-6"
          >
            Request Donation
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <img
            src={bannerIMG}
            alt="Donate blood"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
