import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const walletFiatCurrencyDataSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.walletFiatCurrencyData
);

export const userCryptoCurrencyListSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userCryptoCurrencyList
);
