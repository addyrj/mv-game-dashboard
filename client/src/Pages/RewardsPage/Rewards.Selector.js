import { createSelector } from "@reduxjs/toolkit";

const rewardsReducerSelector = (state) => state.vipClub;

export const rewardsSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.rewardListInfo);

export const rewardsLoadingSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.rewardListLoading);

export const rewardsErrorsSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.rewardListError);