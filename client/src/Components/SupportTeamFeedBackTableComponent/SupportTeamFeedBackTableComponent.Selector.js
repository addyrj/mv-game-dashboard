import { createSelector } from '@reduxjs/toolkit';

const liveSupportReducer = (state) => state.liveSupport;

export const supportTeamFeedBacksSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamFeedBacks
);

export const supportTeamFeedBacksLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamFeedBacksLoading
);

export const supportTeamFeedBacksErrorSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamFeedBacksError
);
