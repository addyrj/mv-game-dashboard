import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const supportTeamUsersSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.supportTeamUsers
);

export const supportTeamUsersLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.supportTeamUsersLoading
);

export const supportTeamUsersErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.supportTeamUsersError
);
