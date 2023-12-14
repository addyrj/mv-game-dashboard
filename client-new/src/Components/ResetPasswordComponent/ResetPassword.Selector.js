import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

export const resetPasswordInfoSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.resetPasswordInfo
);

export const resetPasswordLoadingSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.resetPasswordLoading
);

export const resetPasswordFetchErrorSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.resetPasswordFetchError
);
