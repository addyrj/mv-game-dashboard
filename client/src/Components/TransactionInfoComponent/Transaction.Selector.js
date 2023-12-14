import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

export const selectedTransactionSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedTransaction
);

export const selectedTransactionLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedTransactionLoading
);

export const selectedTransactionErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedTransactionError
);
