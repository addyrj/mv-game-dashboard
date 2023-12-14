import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const accountPasswordChangeLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.accountPasswordChangeLoading
);

export const accountPasswordChangeErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.accountPasswordChangeError
);
