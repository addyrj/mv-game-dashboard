import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const singleProviderSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleProvider
);

export const singleProviderLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleProviderLoading
);

export const singleProviderErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleProviderError
);
