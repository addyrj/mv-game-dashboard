import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

const authReducerSelector = (state) => state.auth;

export const showUserInboxSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showUserInbox
);

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const authLoadingSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.authLoading
);

export const authFetchErrorSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.authFetchError
);
