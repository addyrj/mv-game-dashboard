import { createSelector } from '@reduxjs/toolkit';

const gameReducerSelector = (state) => state.games;

export const gameListInfoSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.gameListInfo
);

export const gameListLoadingSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.gameListLoading
);

export const gameListInfoErrorSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.gameListInfoError
);
