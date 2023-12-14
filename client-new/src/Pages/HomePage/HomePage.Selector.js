import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

const clientReducerSelector = (state) => state.client;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const showAndHideSmSidebarSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showAndHideSmSidebar
);
