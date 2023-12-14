import { createSelector } from '@reduxjs/toolkit';

const liveSupportReducer = (state) => state.liveSupport;

export const supportTeamConversionSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamConversion
);

export const supportTeamConversionLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamConversionLoading
);

export const supportTeamConversionErrorSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamConversionError
);
