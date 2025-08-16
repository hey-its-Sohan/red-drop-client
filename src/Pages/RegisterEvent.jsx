import { CalendarClock, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const RegisterEvent = () => {
  return (
    <div className="min-h-screen bg-slate-100/80 flex items-center justify-center px-5 lg:px-0">
      <div className="card w-full max-w-md bg-white shadow-lg border border-base-200">
        <div className="card-body items-center text-center gap-4">
          {/* Icon */}
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <CalendarClock size={48} strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="card-title text-3xl font-bold text-base-content">
            Registration Opens Soon!
          </h2>

          {/* Message */}
          <p className="text-base-content/70 mb-2">
            We're finalizing the details for this event. Stay tuned - we'll announce when registration is available!
          </p>

          {/* Primary CTA */}
          <Link to={'/'}>
            <button className="btn btn-primary text-white w-full gap-2">
              <Home size={20} />
              Back to Home
            </button></Link>

          {/* Divider */}
          <div className="divider text-sm text-gray-500 my-0">Quick Note</div>

          {/* Secondary Actions */}
          {/* <div className="flex flex-wrap justify-center gap-2 w-full">
            <button className="btn btn-outline btn-sm gap-2 flex-1">
              <CalendarPlus size={18} />
              Remind Me
            </button>
            <button className="btn btn-outline btn-sm gap-2 flex-1">
              <Share2 size={18} />
              Share Event
            </button>
          </div> */}

          {/* Footer Note */}
          <p className="text-xs text-base-content/50 mt-2">
            Typically opens 2-4 weeks before event date
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;