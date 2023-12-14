import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.LuckyDraw;

export const allLotteryPollSelector = createSelector([luckyDrawReducer], (luckyDrawSlice) => luckyDrawSlice.allLotteryPoll);

export const allLotteryPollLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.allLotteryPollLoading
);

export const allLotteryPollErrorSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.allLotteryPollError
);

export const loadMoreLotteryPollTicketsSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.loadMoreLotteryPollTickets
);
