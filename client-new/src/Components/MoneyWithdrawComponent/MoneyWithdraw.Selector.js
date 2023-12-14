import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

const paymentReducer = (state) => state.payment;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const userCryptoCurrencyListSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyList
);

export const fiatPaymentWithDrawPopupSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.fiatPaymentWithDrawPopup
);

export const walletFiatCurrencyDataSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.walletFiatCurrencyData
);
