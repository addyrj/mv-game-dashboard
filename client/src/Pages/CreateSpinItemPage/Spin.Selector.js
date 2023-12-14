import { createSelector } from '@reduxjs/toolkit';

const mediaReducer = (state) => state.media;

const luckyDrawReducer = (state) => state.LuckyDraw;

const gameReudcer = (state) => state.games;

export const pickedImageSelector = createSelector([mediaReducer], (mediaSlice) => mediaSlice.pickedImage);

export const createNewLuckyDrawLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.createNewLuckyDrawLoading
);

export const singleDrawInfoSelector = createSelector([luckyDrawReducer], (luckyDrawSlice) => luckyDrawSlice.singleDrawInfo);

export const updateSingleDrawInfoLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.updateSingleDrawInfoLoading
);

export const allGameCurrencyListSelector = createSelector([gameReudcer], (gameSlice) => gameSlice.allGameCurrencyList);

export const allGameCurrencyListLoadingSelector = createSelector(
   [gameReudcer],
   (gameSlice) => gameSlice.allGameCurrencyListLoading
);
