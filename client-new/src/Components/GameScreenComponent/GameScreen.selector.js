import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

const authReducerSelector = (state) => state.auth;

const paymentReducer = (state) => state.payment;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const singleGameSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.singleGame
);

export const FavoriteGameInfoSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.FavoriteGameInfo
);

export const FavoriteGameLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.FavoriteGameLoading
);

export const FavoriteGameErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.FavoriteGameError
);

export const LikeGameInfoSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.LikeGameInfo
);

export const LikeGameLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.LikeGameLoading
);

export const LikeGameErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.LikeGameError
);

export const gameSelectedCurrencySelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrency
);

export const selectedCurrencyTypeSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.selectedCurrency
);
