import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

const authReducerSelector = (state) => state.auth;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const gameCommentsInfoSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameCommentsInfo
);

export const gameCommentsLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameCommentsLoading
);

export const gameCommentsErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameCommentsError
);
