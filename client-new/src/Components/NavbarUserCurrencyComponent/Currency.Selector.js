import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

const clientReducer = (state) => state.client;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const showPaymentCurrencyDropDownSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.showPaymentCurrencyDropDown
);

export const gameSelectedCurrencySelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrency
);

export const gameSelectedCurrencyLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrencyLoading
);

export const gameSelectedCurrencyErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrencyError
);

export const InsufficientBlanceAlertSelector = createSelector(
   [clientReducer],
   (paymentSlice) => paymentSlice.InsufficientBlanceAlert
);

export const showPaymentTransactionProcessSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.showPaymentTransactionProcess
);

export const showTransactionInfoSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.showTransactionInfo
);

export const moneyUpdateAnimationSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.moneyUpdateAnimation
);

export const selectedCurrencySelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrency
);

export const selectedCurrencyLoadingSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrencyLoading
);

export const selectedCurrencyErrorSelector = createSelector(
   [clientReducer],
   (clientSlice) => clientSlice.selectedCurrencyError
);
