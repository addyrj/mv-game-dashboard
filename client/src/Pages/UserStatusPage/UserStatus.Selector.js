import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const userAccountInformationSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userAccountInformation
);
