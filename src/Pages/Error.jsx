import React from 'react';

import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router';


const Error = () => {



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-6">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-6">
        "The page you're looking for doesn't exist."
      </p>
      <Link to="/" className="btn text-white btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
