import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

const authReducer = (state) => state.auth;

export const showSidebarChatSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showSidebarChat
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);
