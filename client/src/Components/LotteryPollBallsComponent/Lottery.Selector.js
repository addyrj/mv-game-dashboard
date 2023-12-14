import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

const luckyDrawReducer = (state) => state.LuckyDraw;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const lotteryPollUpdateLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.lotteryPollUpdateLoading
);
