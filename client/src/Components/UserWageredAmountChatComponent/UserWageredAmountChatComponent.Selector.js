import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const userWageredAmountSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userWageredAmount
);

export const userWageredAmountLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userWageredAmountLoading
);

export const userWageredAmountErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userWageredAmountError
);
