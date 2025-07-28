import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import useUserRole from '../Hooks/useUserRole';
import Loader from '../Components/Loader';

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
