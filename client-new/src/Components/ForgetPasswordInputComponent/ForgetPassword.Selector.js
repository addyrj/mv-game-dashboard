import { createSelector } from '@reduxjs/toolkit';

const selectAuthReducer = (state) => state.auth;

export const forgetPasswordInfoSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.forgetPasswordInfo
);

export const forgetPasswordLoadingSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.forgetPasswordLoading
);

export const forgetPasswordFetchErrorSelector = createSelector(
   [selectAuthReducer],
   (authSlice) => authSlice.forgetPasswordFetchError
);
