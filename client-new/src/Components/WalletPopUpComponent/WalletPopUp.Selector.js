import { createSelector } from '@reduxjs/toolkit';

const clientReducer = (state) => state.client;

export const screenZoomLevelSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.screenZoomLevel
);
