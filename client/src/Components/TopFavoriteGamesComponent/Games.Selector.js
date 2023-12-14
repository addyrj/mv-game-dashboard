import { createSelector } from '@reduxjs/toolkit';

const gameReducerSelector = (state) => state.games;

export const topFavoriteGamesSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.topFavoriteGames
);

export const topFavoriteGamesLoadingSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.topFavoriteGamesLoading
);

export const topFavoriteGamesErrorSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.topFavoriteGamesError
);
