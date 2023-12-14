import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const gameStatusSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameStatus
);

export const gameStatusLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameStatusLoading
);

export const gameStatusErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameStatusError
);
