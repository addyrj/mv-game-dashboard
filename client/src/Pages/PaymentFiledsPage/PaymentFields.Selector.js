import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

export const paymentOptionsFieldsSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.paymentOptionsFields
);

export const paymentOptionsFieldsLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.paymentOptionsFieldsLoading
);

export const paymentOptionsFieldsErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.paymentOptionsFieldsError
);
