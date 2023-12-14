import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const newGameCategorySelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.newGameCategory
);

export const newGameCategoryLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.newGameCategoryLoading
);

export const newGameCategoryErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.newGameCategoryError
);

export const singleGameCategorySelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleGameCategory
);

export const singleGameCategoryLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleGameCategoryLoading
);

export const singleGameCategoryErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleGameCategoryError
);

export const updateGameCategoryLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.updateGameCategoryLoading
);
