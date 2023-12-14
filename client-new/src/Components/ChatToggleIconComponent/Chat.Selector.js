import { createSelector } from '@reduxjs/toolkit';

const clientReducer = (state) => state.client;

export const globalChatMessagesSeenSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.globalChatMessagesSeen
);

export const showSidebarChatSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.showSidebarChat
);
