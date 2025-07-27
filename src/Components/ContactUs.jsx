import React from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className="bg-base-100 py-20 px-5" id="contact">
      <div className="max-w-screen-xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>

        <p className="text-gray-600 mb-10">
          Have questions, feedback, or want to get involved? Reach out and we'll get back to you as soon as possible.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered md:col-span-2 w-full"
            rows="5"
            required
          ></textarea>
          <motion.button
            type="submit"
            className="btn btn-primary text-white md:col-span-2 w-full"
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
