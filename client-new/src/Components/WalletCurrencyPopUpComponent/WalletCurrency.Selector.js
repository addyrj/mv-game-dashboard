import { createSelector } from '@reduxjs/toolkit';

const paymentReducerSelector = (state) => state.payment;

const authReducer = (state) => state.auth;

const clientReducer = (state) => state.client;

export const walletFiatCurrencyDataSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.walletFiatCurrencyData
);

export const walletFiatCurrencyDataLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.walletFiatCurrencyDataLoading
);

export const walletFiatCurrencyDataErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.walletFiatCurrencyDataError
);

export const userCryptoCurrencyListSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.userCryptoCurrencyList
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const selectedCurrencySelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrency
);

export const selectedCurrencyErrorSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrencyError
);
