import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const allGamesListSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.allGamesList
);

export const allGamesListLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.allGamesListLoading
);

export const allGamesListErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.allGamesListError
);
