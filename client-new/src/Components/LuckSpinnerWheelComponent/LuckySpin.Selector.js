import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.luckyDraw;

export const luckyDrawDataSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.luckyDrawData
);
