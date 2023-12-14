import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

const clientReducer = (state) => state.client;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const userCryptoCurrencyListSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyList
);

export const userCryptoCurrencyListLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyListLoading
);

export const userCryptoCurrencyListErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyListError
);

export const selectedCurrencySelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrency
);
