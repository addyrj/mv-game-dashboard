import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

const clientReducerSelector = (state) => state.client;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const showSidebarChatSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showSidebarChat
);

export const showSidebarNotificationsSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showSidebarNotifications
);

export const showAndHideSmSidebarSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showAndHideSmSidebar
);
