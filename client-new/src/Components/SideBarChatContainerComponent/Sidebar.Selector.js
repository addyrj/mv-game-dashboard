import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

export const showSidebarChatSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.showSidebarChat
);
