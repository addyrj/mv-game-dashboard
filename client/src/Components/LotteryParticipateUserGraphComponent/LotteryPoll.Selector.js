import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.LuckyDraw;

export const userLuckyNumbersSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.userLuckyNumbers
);

export const userLuckyNumbersLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.userLuckyNumbersLoading
);

export const userLuckyNumbersErrorSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.userLuckyNumbersError
);

export const userJackpotNumbersSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.userJackpotNumbers
);

export const userJackpotNumbersLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.userJackpotNumbersLoading
);

export const userJackpotNumbersErrorSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.userJackpotNumbersError
);
