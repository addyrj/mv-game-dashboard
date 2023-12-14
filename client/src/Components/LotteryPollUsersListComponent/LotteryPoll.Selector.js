import { createSelector } from '@reduxjs/toolkit';

const luckDrawReducer = (state) => state.LuckyDraw;

export const singleLotteryPollUsersSelector = createSelector(
   [luckDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.singleLotteryPollUsers
);

export const singleLotteryPollUsersLoadingSelector = createSelector(
   [luckDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.singleLotteryPollUsersLoading
);

export const singleLotteryPollUsersErrorSelector = createSelector(
   [luckDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.singleLotteryPollUsersError
);
