import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

const gameReducerSelector = (state) => state.games;

const selectClientReducer = (state) => state.client;

export const showSearchListCmSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showSearchListCm
);

export const topRatedGamesSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.topRatedGames
);

export const topRatedGamesLoadingSelecttor = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.topRatedGamesLoading
);

export const topRatedGamesErrorSelector = createSelector(
   [gameReducerSelector],
   (gamesSlice) => gamesSlice.topRatedGamesError
);

export const commingSoonGamesSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.commingSoonGames
);
