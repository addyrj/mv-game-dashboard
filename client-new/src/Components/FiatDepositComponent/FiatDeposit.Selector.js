import { createSelector } from '@reduxjs/toolkit';

const paymentReducerSelector = (state) => state.payment;

const clientReducer = (state) => state.client;

const authReducer = (state) => state.auth;

export const selectedCurrencyMethodsSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.selectedCurrencyMethods
);

export const selectedCurrencyMethodsLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.selectedCurrencyMethodsLoading
);

export const selectedCurrencyMethodsErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.selectedCurrencyMethodsError
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const fiatPaymentTransactionLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.fiatPaymentTransactionLoading
);

export const fiatPaymentTransactionErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.fiatPaymentTransactionError
);

export const selectedCrPaymentOptionsSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.selectedCrPaymentOptions
);

export const selectedCurrencySelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrency
);

export const selectedCurrencyErrorSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrencyError
);

export const walletFiatCurrencyDataSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.walletFiatCurrencyData
);

export const walletFiatCurrencyDataLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.walletFiatCurrencyDataLoading
);

export const walletFiatCurrencyDataErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.walletFiatCurrencyDataError
);
