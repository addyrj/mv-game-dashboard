import { createSelector } from '@reduxjs/toolkit';

const gameReducerSelector = (state) => state.games;

export const gameProvidersSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.gameProviders
);

export const gameProvidersLoadingSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.gameProvidersLoading
);

export const gameProvidersErrorSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.gameProvidersError
);
