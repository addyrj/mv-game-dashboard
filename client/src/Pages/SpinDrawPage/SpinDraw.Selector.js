import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.LuckyDraw;

export const luckyDrawsSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.luckyDraws
);

export const luckyDrawLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.luckyDrawLoading
);
