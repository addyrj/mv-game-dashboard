import { createSelector } from '@reduxjs/toolkit';

const gameProviderReducerSelector = (state) => state.gameProviders;

export const postNewGameProviderInfoSelector = createSelector(
   [gameProviderReducerSelector],
   (gameProvidersSlice) => gameProvidersSlice.postNewGameProviderInfo
);

export const postNewGameProviderLoadingSelector = createSelector(
   [gameProviderReducerSelector],
   (gameProvidersSlice) => gameProvidersSlice.postNewGameProviderLoading
);

export const postNewGameProviderErrorSelector = createSelector(
   [gameProviderReducerSelector],
   (gameProvidersSlice) => gameProvidersSlice.postNewGameProviderError
);

export const postNewGameProviderInvalidErrorsSelector = createSelector(
   [gameProviderReducerSelector],
   (gameProvidersSlice) => gameProvidersSlice.postNewGameProviderInvalidErrors
);
