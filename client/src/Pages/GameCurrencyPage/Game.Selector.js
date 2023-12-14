import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const gameCurrencyListInfoSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameCurrencyListInfo
);

export const gameCurrencyListLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameCurrencyListLoading
);

export const gameCurrencyListErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameCurrencyListError
);
