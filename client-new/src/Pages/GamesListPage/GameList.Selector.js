import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const queryGameListsSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.queryGameLists
);

export const queryGameListsLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.queryGameListsLoading
);

export const queryGameListsErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.queryGameListsError
);
