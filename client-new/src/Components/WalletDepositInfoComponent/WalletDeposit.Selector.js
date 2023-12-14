import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const depositTransactionsSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.depositTransactions
);

export const depositTransactionsLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.depositTransactionsLoading
);

export const depositTransactionsErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.depositTransactionsError
);

export const showTransactionInfoSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.showTransactionInfo
);
