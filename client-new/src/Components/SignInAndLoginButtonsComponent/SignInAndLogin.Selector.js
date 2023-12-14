import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const showOtpVarificationPopupSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.showOtpVarificationPopup
);
