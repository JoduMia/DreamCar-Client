import React from 'react'
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';
import Loader from '../components/shared/Loader';
import useAdminChecker from '../hooks/useAdmin';
import useBuyerChecker from '../hooks/useBuyer';

const BuyerRoutes = ({children}) => {
    const{ user} = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdminChecker(user?.email);
    const [isBuyer,buyerLoading] = useBuyerChecker(user?.email);
    const location = useLocation();
    if(adminLoading || buyerLoading) {
        return <Loader />
    }
  if(user && (isBuyer || isAdmin)) {
      return children;
}
return <Navigate to='/login' state={{from: location}} replace />
}

export default BuyerRoutes;