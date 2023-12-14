import { createSelector } from '@reduxjs/toolkit';

const gameReducerSelector = (state) => state.games;

export const gameCommentsInfoSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.gameCommentsInfo
);
