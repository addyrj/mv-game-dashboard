import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const showAndHideSmSidebarSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.showAndHideSmSidebar
);

export const allCategorySelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.allCategory
);

export const allCategoryLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.allCategoryLoading
);

export const allCategoryErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.allCategoryError
);
