import { createSelector } from '@reduxjs/toolkit';

const gameProviderReducerSelector = (state) => state.gameProviders;

export const gameProvidersSelector = createSelector(
   [gameProviderReducerSelector],
   (gameProvidersSlice) => gameProvidersSlice.gameProviders
);

export const gameProvidersLoadingSelector = createSelector(
   [gameProviderReducerSelector],
   (gameProvidersSlice) => gameProvidersSlice.gameProvidersLoading
);

export const gameProvidersErrorSelector = createSelector(
   [gameProviderReducerSelector],
   (gameProvidersSlice) => gameProvidersSlice.gameProvidersError
);
