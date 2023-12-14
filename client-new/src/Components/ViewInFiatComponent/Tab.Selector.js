import { createSelector } from '@reduxjs/toolkit';

const clientReducer = (state) => state.client;

const authReducer = (state) => state.auth;

export const userProfilePrivacyInfoSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfo
);

export const userProfilePrivacyInfoFetchErrorSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfoFetchError
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);
