import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useRoles from '../Hooks/useRoles';

const Navigation = function () {
   let location = useLocation();
   return <Navigate to="/" state={{ from: location }} replace />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
   const {
      isLoading,
      userRoles: { isSupport, isAdmin, roles },
   } = useRoles();

   let hasAccess = null;

   if (!isLoading && allowedRoles) {
      hasAccess = allowedRoles.find((el) => roles.includes(el));
   }

   if (!isLoading) {
      if (!hasAccess) return <Navigation />;
      if (hasAccess) return children;
      if (isSupport) return <Navigation />;
      if (isAdmin) return children;
   }
};

export default ProtectedRoute;