import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const userProfilePrivacyInfoSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userProfilePrivacyInfo
);

export const userProfilePrivacyInfoLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userProfilePrivacyInfoLoading
);

export const userProfilePrivacyInfoFetchErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userProfilePrivacyInfoFetchError
);
