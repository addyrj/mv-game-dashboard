import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

const gamesReducerSelector = (state) => state.games;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const recentPlayGamesListSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.recentPlayGamesList
);

export const recentPlayGamesListLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.recentPlayGamesListLoading
);

export const recentPlayGamesListErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.recentPlayGamesListError
);
