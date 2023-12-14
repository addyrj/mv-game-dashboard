import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.luckyDraw;

const authReducer = (state) => state.auth;

export const userSpinInfoSelector = createSelector(
   [luckyDrawReducer],
   (clientSlice) => clientSlice.userSpinInfo
);

export const getUserSpinInfoLoadingSelector = createSelector(
   [luckyDrawReducer],
   (clientSlice) => clientSlice.getUserSpinInfoLoading
);

export const userSpinInfoErrorSelector = createSelector(
   [luckyDrawReducer],
   (clientSlice) => clientSlice.userSpinInfoError
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const selectedDrawSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.selectedDraw
);

export const luckyDrawDataLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.luckyDrawDataLoading
);
