import React from 'react';
import { AlertTriangle, RotateCw, Home, Mail } from 'lucide-react';
import { Link } from 'react-router';

const Error = ({ errorType = "404", errorMessage = "Page not found" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100/80">
      <div className="card hover:shadow-primary/10 w-full max-w-md bg-white shadow-xl">
        <div className="card-body items-center text-center gap-4">
          {/* Error Icon */}
          <div className="p-4 rounded-full bg-error/10 text-error">
            <AlertTriangle size={64} strokeWidth={1.5} />
          </div>

          {/* Error Code */}
          <h1 className="text-5xl font-bold text-error">{errorType}</h1>

          {/* Error Message */}
          <h2 className="text-2xl font-semibold text-base-content mt-2">
            {errorMessage}
          </h2>

          <p className="text-base-content/70 mb-2">
            Oops! Something went wrong. Please try again or contact support if the problem persists.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-3">
            <Link to={'/'}>
              <button className="btn btn-primary text-white gap-2">
                <Home size={20} />
                Back to Home
              </button></Link>

            {/* <div className="flex gap-3">
              <button className="btn btn-ghost gap-2 flex-1">
                <RotateCw size={20} />
              Try Again
              </button>
              <button className="btn btn-ghost gap-2 flex-1">
                <Mail size={20} />
                Contact Support
              </button>
            </div> */}
          </div>

          {/* Additional Help */}
          <div className="text-sm text-base-content/50 mt-3">
            <p>Need immediate help?</p>
            <p>Call support at <span className="font-semibold">+880-1234-567890</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;