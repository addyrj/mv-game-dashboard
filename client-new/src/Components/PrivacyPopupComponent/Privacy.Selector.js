import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

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
