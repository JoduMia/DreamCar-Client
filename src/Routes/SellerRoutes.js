import React from 'react'
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';
import Loader from '../components/shared/Loader';
import useAdminChecker from '../hooks/useAdmin';
import useSellerChecker from '../hooks/useSeller';

const SellerRoute = ({children}) => {
    const{ user} = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdminChecker(user?.email);
    const [isSeller,sellerLoading] = useSellerChecker(user?.email);
    const location = useLocation();
    if(adminLoading || sellerLoading) {
        return <Loader />
    }
  if(user && (isSeller || isAdmin)) {
      return children;
}
return <Navigate to='/login' state={{from: location}} replace />
}

export default SellerRoute;