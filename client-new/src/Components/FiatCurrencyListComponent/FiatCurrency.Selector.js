import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

const clientReducer = (state) => state.client;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const selectedCurrencySelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrency
);
