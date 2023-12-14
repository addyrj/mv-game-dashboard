import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

const authReducerSelector = (state) => state.auth;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const singleGameSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.singleGame
);

export const singleGameLoadingSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.singleGameLoading
);

export const singleGameErrorSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.singleGameError
);
