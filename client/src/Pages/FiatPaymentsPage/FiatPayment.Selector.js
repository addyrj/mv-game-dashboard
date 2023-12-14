import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

export const fiatTransactionsSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatTransactions
);

export const fiatTransactionsLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatTransactionsLoading
);

export const fiatTransactionsErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatTransactionsError
);
