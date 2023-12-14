import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const allCategoryInfoSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.allCategoryInfo
);

export const getAllCategoryInfoLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.getAllCategoryInfoLoading
);

export const getAllCategoryInfoErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.getAllCategoryInfoError
);
