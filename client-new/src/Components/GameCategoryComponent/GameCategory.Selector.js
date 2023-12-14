import { createSelector } from '@reduxjs/toolkit';

const clientReducer = (state) => state.client;

export const gamesEnableCategorySelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.gamesEnableCategory
);

export const gamesEnableCategoryLoadingSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.gamesEnableCategoryLoading
);

export const gamesEnableCategoryErrorSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.gamesEnableCategoryError
);
