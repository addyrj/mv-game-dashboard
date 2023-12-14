import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.luckyDraw;

export const luckyDrawWinDataSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.luckyDrawWinData
);
