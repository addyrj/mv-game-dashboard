import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const withdrawTransactionInfoSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.withdrawTransactionInfo
);

export const withdrawTransactionLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.withdrawTransactionLoading
);

export const withdrawTransactionErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.withdrawTransactionError
);

export const userAccountInformationSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userAccountInformation
);
