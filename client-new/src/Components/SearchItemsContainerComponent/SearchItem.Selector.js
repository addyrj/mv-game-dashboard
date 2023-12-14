import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const gameSearchListsSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameSearchLists
);

export const gameSearchListsErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameSearchListsError
);
