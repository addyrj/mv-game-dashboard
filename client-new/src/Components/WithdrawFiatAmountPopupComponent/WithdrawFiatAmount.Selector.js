import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

export const selectedPaymentFieldsSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedPaymentFields
);

export const selectedPaymentFieldsLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedPaymentFieldsLoading
);

export const selectedPaymentFieldsErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedPaymentFieldsError
);

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const gameSelectedCurrencySelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.gameSelectedCurrency
);

export const fiatTransactionsWithdrawErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatTransactionsWithdrawError
);

export const fiatTransactionsWithdrawLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatTransactionsWithdrawLoading
);

export const selectedCurrencyWithAmountSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedCurrencyWithAmount
);

export const selectedCurrencyMethodsSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.selectedCurrencyMethods
);
