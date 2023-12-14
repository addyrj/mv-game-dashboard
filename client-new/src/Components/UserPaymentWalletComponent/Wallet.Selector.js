import { createSelector } from '@reduxjs/toolkit';

const clientReducer = (state) => state.client;

export const toggleUserWalletInfoSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.toggleUserWalletInfo
);
