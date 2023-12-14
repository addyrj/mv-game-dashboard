import { createSelector } from '@reduxjs/toolkit';

const paymentReducerSelector = (state) => state.payment;

export const insertPaymentMethodInfoSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.insertPaymentMethodInfo
);

export const insertPaymentMethodInfoLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.insertPaymentMethodInfoLoading
);

export const insertPaymentMethodErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.insertPaymentMethodError
);

export const updatePaymentOptionInfoSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.updatePaymentOptionInfo
);

export const updatePaymentOptionLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.updatePaymentOptionLoading
);

export const updatePaymentOptionErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.updatePaymentOptionError
);

export const paymentFieldsSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.paymentFields
);

export const paymentFieldsLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.paymentFieldsLoading
);

export const paymentFieldsErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.paymentFieldsError
);
