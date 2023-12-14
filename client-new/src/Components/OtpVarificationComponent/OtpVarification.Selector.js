import { createSelector } from '@reduxjs/toolkit';

const selectAuthReducer = (state) => state.auth;

export const authSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.auth
);

export const authLoadingSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.authLoading
);

export const otpErrorSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.otpError
);

export const resendOtpInfoSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.resendOtpInfo
);

export const resendOtpLoadingSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.resendOtpLoading
);

export const resendOtpErrorSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.resendOtpError
);
