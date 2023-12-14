import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const rolesSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.roles
);

export const getRolesLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.getRolesLoading
);

export const getRolesErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.getRolesError
);
