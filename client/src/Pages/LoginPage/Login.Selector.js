import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const authLoadingSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.authLoading
);

export const authErrorSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.authError
);
