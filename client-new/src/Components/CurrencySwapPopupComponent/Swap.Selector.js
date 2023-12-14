import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

export const userCryptoCurrencyListSelector = createSelector(
   [paymentReducer],
   (clientSlice) => clientSlice.userCryptoCurrencyList
);

export const userCryptoCurrencyListLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyListLoading
);

export const userCryptoCurrencyListErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyListError
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);
