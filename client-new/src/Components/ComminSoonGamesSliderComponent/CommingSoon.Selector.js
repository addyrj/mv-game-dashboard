import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const commingSoonGamesSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.commingSoonGames
);

export const commingSoonGamesLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.commingSoonGamesLoading
);

export const commingSoonGamesErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.commingSoonGamesError
);
