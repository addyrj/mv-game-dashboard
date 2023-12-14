import { createSelector } from '@reduxjs/toolkit';

const paymentReducerSelector = (state) => state.payment;

export const currencyMethodsSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.currencyMethods
);

export const currencyMethodsLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.currencyMethodsLoading
);

export const currencyMethodsErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.currencyMethodsError
);
