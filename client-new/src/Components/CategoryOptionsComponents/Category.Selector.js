import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const showDailySpinSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.showDailySpinPopUp
);
