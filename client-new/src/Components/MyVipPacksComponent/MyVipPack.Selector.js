import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.luckyDraw;

export const drawsSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.draws
);

export const drawsLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.drawsLoading
);

export const showConPopupSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.showConPopup
);
