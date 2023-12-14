import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

export const singleOrderSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.singleOrder
);

export const singleOrderLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.singleOrderLoading
);

export const singleOrderErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.singleOrderError
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const updateFiatWithdrawSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.updateFiatWithdraw
);

export const updateFiatWithdrawLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.updateFiatWithdrawLoading
);

export const updateFiatWithdrawErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.updateFiatWithdrawError
);
