import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

const authReducer = (state) => state.auth;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const userCryptoCurrencyListSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyList
);

export const userCryptoCurrencyListLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyListLoading
);

export const userCryptoCurrencyListErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoCurrencyListError
);

export const userCryptoWalletAddressSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoWalletAddress
);

export const userCryptoWalletAddressLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoWalletAddressLoading
);

export const userCryptoWalletAddressErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.userCryptoWalletAddressError
);

export const withdrawCryptoInfoSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.withdrawCryptoInfo
);

export const withdrawCryptoInfoLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.withdrawCryptoInfoLoading
);

export const withdrawCryptoInfoErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.withdrawCryptoInfoError
);
