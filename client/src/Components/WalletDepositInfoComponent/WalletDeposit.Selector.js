import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const depositTransactionsSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.depositTransactions
);

export const depositTransactionsLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.depositTransactionsLoading
);

export const depositTransactionsErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.depositTransactionsError
);

export const showTransactionInfoSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.showTransactionInfo
);

export const userAccountInformationSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userAccountInformation
);
