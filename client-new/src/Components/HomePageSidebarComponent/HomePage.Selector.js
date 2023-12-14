import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const showSidebarChatSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.showSidebarChat
);

export const showSidebarNotificationsSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.showSidebarNotifications
);
