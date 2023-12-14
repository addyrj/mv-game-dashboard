import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

export const gameSelectedCurrencySelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrency
);

export const gameSelectedCurrencyLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrencyLoading
);

export const gameSelectedCurrencyErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrencyError
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);
