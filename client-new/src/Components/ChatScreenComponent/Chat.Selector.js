import { createSelector } from '@reduxjs/toolkit';

const selectGroupReducer = (state) => state.group;

export const groupChatsSelector = createSelector(
   [selectGroupReducer],
   (groupSlice) => groupSlice.groupChats
);

export const groupChatsLoadingSelector = createSelector(
   [selectGroupReducer],
   (groupSlice) => groupSlice.groupChatsLoading
);

export const groupChatsFetchErrorSelector = createSelector(
   [selectGroupReducer],
   (groupSlice) => groupSlice.groupChatsFetchError
);
