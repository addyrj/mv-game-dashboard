import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const gameProvidersListSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameProvidersList
);

export const gameProvidersLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameProvidersLoading
);

export const gameProvidersErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.gameProvidersError
);

export const insertGameInfoSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.insertGameInfo
);

export const insertGameLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.insertGameLoading
);

export const insertGameErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.insertGameError
);

export const updateGameinfoSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.updateGameinfo
);

export const updateGameLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.updateGameLoading
);

export const updateGameErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.updateGameError
);

export const allGamesCategorysSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.allGamesCategorys
);

export const allGamesCategorysLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.allGamesCategorysLoading
);

export const allGamesCategorysErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.allGamesCategorysError
);
