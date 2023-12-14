import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const userCryptoCurrencyListSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userCryptoCurrencyList
);

export const userCryptoCurrencyListLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userCryptoCurrencyListLoading
);

export const userCryptoCurrencyListErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userCryptoCurrencyListError
);
