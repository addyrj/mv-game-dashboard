import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const AllGamesInfoSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.AllGamesInfo
);

export const AllGamesInfoLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.AllGamesInfoLoading
);

export const AllGamesInfoErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.AllGamesInfoError
);

export const selectedProviderGamesSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.selectedProviderGames
);

export const selectedProviderGamesErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.selectedProviderGamesError
);

export const selectedProviderGamesLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.selectedProviderGamesLoading
);
