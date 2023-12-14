import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

const luckyDrawReducer = (state) => state.LuckyDraw;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const singleLotteryPollSelector = createSelector(
   [luckyDrawReducer],
   (drawSlice) => drawSlice.singleLotteryPoll
);

export const singleLotteryPollLoadingSelector = createSelector(
   [luckyDrawReducer],
   (drawSlice) => drawSlice.singleLotteryPollLoading
);

export const singleLotteryPollErrorSelector = createSelector(
   [luckyDrawReducer],
   (drawSlice) => drawSlice.singleLotteryPollError
);
