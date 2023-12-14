import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const selectShowSidebar = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.showSidebarChat
);

export const ShowSidebarNotificationsSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.showSidebarNotifications
);
