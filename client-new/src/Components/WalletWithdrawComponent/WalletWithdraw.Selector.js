import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

const paymentReducer = (state) => state.payment;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const withdrawTransactionInfoSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.withdrawTransactionInfo
);

export const withdrawTransactionLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.withdrawTransactionLoading
);

export const withdrawTransactionErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.withdrawTransactionError
);
