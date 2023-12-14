import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

const selectClientReducer = (state) => state.client;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const userProfilePrivacyInfoSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfo
);

export const userProfilePrivacyInfoLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfoLoading
);

export const userProfilePrivacyInfoFetchErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfoFetchError
);
