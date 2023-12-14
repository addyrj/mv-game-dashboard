import { createSelector } from '@reduxjs/toolkit';

const liveSupportReducer = (state) => state.liveSupport;

export const queryUsersListSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.queryUsersList
);

export const queryUsersListLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.queryUsersListLoading
);

export const queryUsersListErrorSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.queryUsersListError
);
