import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const friendsSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.friends
);

export const FriendListLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.getFriendListLoading
);

export const FriendListFetchErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.getFriendListFetchError
);
