import React from 'react';
import {
  Facebook,

  Linkedin,
  HeartHandshake,
  Github,
  Droplet,
} from 'lucide-react';
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-secondary text-base-100">
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 py-7 md:flex justify-between gap-8">

        {/* Brand Info */}
        <div>
          {/* <div className="flex items-center gap-1 mb-3">
            <Droplet size={36} className="text-primary" fill='#C62828' color="#C62828" />
            <h2 className="text-3xl font-semibold tracking-wide">RedDrop</h2>
          </div> */}
          <div>
            <img
              className='w-48 mb-2'
              src={logo} alt="" />
          </div>
          <p className="text-sm text-base-300 leading-relaxed">
            RedDrop connects blood donors with recipients to help save lives. <br />
            Join us in making a difference — one drop at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-primary transition">Home</a>
            </li>
            <li>
              <a href="/fund-details" className="hover:text-primary transition">Donate</a>
            </li>
            <li>
              <a href="/dashboard/create-donation-request" className="hover:text-primary transition">Request Blood</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact</h3>
          <p className=" mb-4 text-base-300 leading-relaxed">
            support@reddrop.org<br />
            +880-1234-567890<br />
            Dhaka, Bangladesh
          </p>

        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Socials</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/mahmudul.islam.sohan.2025/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Facebook size={24} />
            </a>

            <a href="https://github.com/hey-its-Sohan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/mahmudul-islam-sohan/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-base-300 text-center py-4 text-sm text-base-300">
        © {new Date().getFullYear()} RedDrop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
