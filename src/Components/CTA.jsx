import React from 'react';
import { Link } from 'react-router';

const CTA = () => {
  return (
    <div
      className="hero md:h-[500px] bg-slate-100/80"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dpwjurgeu/image/upload/v1755330556/74d488fb-cca3-4868-8ed1-07335057bc15.png)",
      }}
    >
      <div className="hero-overlay bg-gradient-to-r from-black/40 via-black/5 to-black/30"></div>
      <div className="hero-content py-16 text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl md:text-4xl font-bold"> Join Our Volunteer Team</h1>
          <p className="text-xl opacity-90 mb-5">
            Help us organize blood drives, spread awareness, and coordinate
            with donors
          </p>
          <Link to={'/sign-up'}><button className="btn btn-primary text-white">Get Started</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;