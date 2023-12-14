import { useState, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const adminReducer = (state) => state.admin;
const rolesSelector = createSelector([adminReducer], (adminSlice) => adminSlice.userRole);
const userRoleErrorSelector = createSelector([adminReducer], (adminSlice) => adminSlice.userRoleError);

const useRoles = () => {
   const [userRoles, setUserRoles] = useState({
      isAdmin: false,
      isUser: false,
      isSubAdmin: false,
      isSupport: false,
      roles: [],
   });
   const [isLoading, setIsLoading] = useState(true);

   const error = useSelector(userRoleErrorSelector);
   const rolesState = useSelector(rolesSelector);

   const checkRole = function (roles, roleValue) {
      const isValidRole = roles.some((ele) => ele.roleName === roleValue);
      return isValidRole;
   };

   useEffect(() => {
      if (!!rolesState && rolesState.length && Array.isArray(rolesState)) {
         const rolesArr = rolesState.map((el) => el?.roleName);

         setUserRoles({
            isAdmin: checkRole(rolesState, 'admin'),
            isSubAdmin: checkRole(rolesState, 'subAdmin'),
            isSupport: checkRole(rolesState, 'support'),
            roles: rolesArr,
         });
         setIsLoading(false);
      }
   }, [rolesState]);

   return { userRoles, isLoading, error };
};

export default useRoles;
