import { createSelector } from '@reduxjs/toolkit';

const gameReducerSelector = (state) => state.games;

export const allGamesListsInfoSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.allGamesListsInfo
);

export const allGamesListsLoadingSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.allGamesListsLoading
);

export const allGamesListsErrorSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.allGamesListsError
);
