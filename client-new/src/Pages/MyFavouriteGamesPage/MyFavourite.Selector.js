import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

const gamesReducerSelector = (state) => state.games;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const favoriteGamesListSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.favoriteGamesList
);

export const favoriteGamesListLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.favoriteGamesListLoading
);

export const favoriteGamesListErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.favoriteGamesListError
);
