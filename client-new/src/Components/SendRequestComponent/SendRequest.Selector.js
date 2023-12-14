import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

export const friendRequestLoadingSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.friendRequestLoading
);
