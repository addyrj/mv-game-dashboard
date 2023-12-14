import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

export const fiatWithdrawTransactionSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatWithdrawTransaction
);

export const fiatWithdrawTransactionLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatWithdrawTransactionLoading
);

export const fiatWithdrawTransactionErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatWithdrawTransactionError
);
