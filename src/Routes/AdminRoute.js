import React from 'react'
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';
import Loader from '../components/shared/Loader';
import useAdminChecker from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const{ user} = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdminChecker(user?.email);
    const location = useLocation();
    if(adminLoading) {
        return <Loader />
    }
  if(user&& isAdmin) {
      return children;
}
return <Navigate to='/login' state={{from: location}} replace />
}

export default AdminRoute;