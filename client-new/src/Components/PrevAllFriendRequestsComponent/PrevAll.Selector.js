import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const friendRequestListSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.friendRequestList
);

export const friendRequestListLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.friendRequestListLoading
);

export const friendRequestListFetchErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.friendRequestListFetchError
);
