import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const userAccountInformationSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userAccountInformation
);

export const userAccountInformationLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userAccountInformationLoading
);

export const userAccountInformationErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userAccountInformationError
);
