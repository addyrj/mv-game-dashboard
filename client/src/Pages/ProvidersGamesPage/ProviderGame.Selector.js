import { createSelector } from '@reduxjs/toolkit';

const gameProvidersReducerSelector = (state) => state.gameProviders;

export const providerGamesListSelector = createSelector(
   [gameProvidersReducerSelector],
   (gameSlice) => gameSlice.providerGamesList
);

export const providerGamesLoadingSelector = createSelector(
   [gameProvidersReducerSelector],
   (gameSlice) => gameSlice.providerGamesLoading
);

export const providerGamesErrorSelector = createSelector(
   [gameProvidersReducerSelector],
   (gameSlice) => gameSlice.providerGamesError
);
