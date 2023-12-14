import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const groupChatsSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.groupChats
);

export const groupChatsLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.groupChatsLoading
);

export const groupChatsErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.groupChatsError
);
