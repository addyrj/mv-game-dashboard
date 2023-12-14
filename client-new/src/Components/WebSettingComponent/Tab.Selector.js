import { createSelector } from '@reduxjs/toolkit';

const clientReducer = (state) => state.client;

export const userProfilePrivacyInfoSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfo
);

export const userProfilePrivacyInfoFetchErrorSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfoFetchError
);

export const userProfilePrivacyInfoLoadingSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.userProfilePrivacyInfoLoading
);
