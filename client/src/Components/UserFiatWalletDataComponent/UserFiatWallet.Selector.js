import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const walletFiatCurrencyDataSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.walletFiatCurrencyData
);

export const walletFiatCurrencyDataLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.walletFiatCurrencyDataLoading
);

export const walletFiatCurrencyDataErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.walletFiatCurrencyDataError
);
