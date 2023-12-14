import { createSelector } from '@reduxjs/toolkit';

const clientReducer = (state) => state.client;

export const showSwapPopupSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.showSwapPopup
);
