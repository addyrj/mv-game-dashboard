import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const allGlobalChatGroupsSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.allGlobalChatGroups
);

export const allGlobalChatGroupsLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.allGlobalChatGroupsLoading
);

export const allGlobalChatGroupsErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.allGlobalChatGroupsError
);
