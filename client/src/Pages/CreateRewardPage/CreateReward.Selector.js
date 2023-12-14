import { createSelector } from "@reduxjs/toolkit";

const rewardsReducerSelector = (state) => state.vipClub;

export const currencySelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.currencyListInfo);

export const currencyLoadingSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.currencyListLoading);

export const currencyErrorsSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.currencyListError);

export const singleRewardSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.singleRewardInfo);

export const singleRewardLoadingSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.singleRewardLoading);

export const singleRewardErrorsSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.singleRewardError);