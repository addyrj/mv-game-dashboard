import { createSelector } from '@reduxjs/toolkit';

const paymentReducerSelector = (state) => state.payment;

const authReducer = (state) => state.auth;

export const fiatCurrencySelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.faitCurrency
);

export const userCryptoCurrencyListSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.userCryptoCurrencyList
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const walletFiatCurrencyDataSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.walletFiatCurrencyData
);
