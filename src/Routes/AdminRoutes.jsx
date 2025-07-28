import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import useUserRole from '../Hooks/useUserRole';
import Loader from '../Components/Loader';
import { AuthContext } from '../Contexts/AuthContext';

const AdminRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <Loader />;
  }

  if (user && role === 'admin') {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoutes;
