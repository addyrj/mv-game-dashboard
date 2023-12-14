import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice?.auth
);
