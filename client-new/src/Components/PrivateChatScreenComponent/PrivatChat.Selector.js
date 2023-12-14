import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const privateChatSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.privateChat
);

export const privateChatFetchErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.privateChatFetchError
);
