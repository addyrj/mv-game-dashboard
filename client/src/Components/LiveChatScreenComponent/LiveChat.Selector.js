import { createSelector } from '@reduxjs/toolkit';

const liveSupportReducer = (state) => state.liveSupport;

const authReducer = (state) => state.auth;

export const authSelector = createSelector([authReducer], (authSlice) => authSlice.auth);

export const queryUsersChatsSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.queryUsersChats
);

export const queryUsersChatsLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.queryUsersChatsLoading
);

export const queryUsersChatsErrorSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.queryUsersChatsError
);
