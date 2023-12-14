import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

export const showSidebarNotificationsSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showSidebarNotifications
);
