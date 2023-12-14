import { createSelector } from '@reduxjs/toolkit';

const liveSupportReducer = (state) => state.liveSupport;

const authReducer = (state) => state.auth;

export const selectedQuerySelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.selectedQuery
);

export const authSelector = createSelector([authReducer], (authSlice) => authSlice.auth);

export const rejectUserQueryLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.rejectUserQueryLoading
);
