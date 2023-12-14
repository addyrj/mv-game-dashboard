import { createSelector } from '@reduxjs/toolkit';

const luckyDrawReducer = (state) => state.LuckyDraw;

export const singleLotteryPollSelector = createSelector([luckyDrawReducer], (luckDrawSlice) => luckDrawSlice.singleLotteryPoll);
