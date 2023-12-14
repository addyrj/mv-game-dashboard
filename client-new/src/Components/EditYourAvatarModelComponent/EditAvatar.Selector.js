import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const updateAvatarLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.updateAvatarLoading
);

export const updateAvatarFetchErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.updateAvatarFetchError
);

export const userAvatarsSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.userAvatars
);

export const userAvatarsLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.userAvatarsLoading
);

export const userAvatarsErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.userAvatarsError
);
