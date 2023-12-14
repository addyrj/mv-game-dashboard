import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const loadMoreChatMessagesSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.loadMoreChatMessages
);

export const groupChatsLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.groupChatsLoading
);

export const selectedGroupSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.selectedGroup
);
