import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, {
   cryptoPaymentServer,
} from '../../../Services/AxiosInstance';
import { toggleUserWalletHandler } from '../Client/clientSlice';

export const getFiatCurrencyListsWithAmount = createAsyncThunk(
   'payment/getFaitCurrencyListsWithAmount',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const userWalletRespose = await axiosInstance.get(
            `/payment/get-user-wallet-currency?userId=${userId}`
         );

         return userWalletRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSelectedCurrencyPaymentOptions = createAsyncThunk(
   'payment/getSelectedCurrencyPaymentOptions',
   async ({ currencyId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-selected-currency-payment-options?currencyId=${currencyId}`
         );
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSelectedCurrencyAmount = createAsyncThunk(
   'payment/getSelectedCurrencyAmount',
   async ({ currencyId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-selected-currency-amount?currencyId=${currencyId}`
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserAllFiatCurrency = createAsyncThunk(
   'payment/getUserAllFiatCurrency',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const allCurrencyResponse = await axiosInstance.get(
            `/payment/get-user-all-fiat-currency-info?userId=${userId}`
         );
         return allCurrencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserAllCryptoCurrency = createAsyncThunk(
   'payment/getUserCryptoCurrencyInfo',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const userCryptoCurrencyList = await cryptoPaymentServer.get(
            `/testnet/userInfo?userId=${userId}`
         );
         return userCryptoCurrencyList;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserCryptoWalletAddress = createAsyncThunk(
   'payment/getUserCryptoWalletAddress',
   async ({ userId, currency }, { rejectWithValue }) => {
      try {
         const response = await cryptoPaymentServer.get(
            `/testnet/address?userId=${userId}&currency=${currency}`
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserSelectedGameCurrency = createAsyncThunk(
   'payment/getUserSelectedGameCurrency',
   async ({ currencyId, userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-selected-currency-amount?userId=${userId}&currencyId=${currencyId}`
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserSelectedCuryptoCr = createAsyncThunk(
   'payment/getUserSelectedCuryptoCr',
   async ({ userId, currencyName }, { rejectWithValue }) => {
      try {
         const response = await cryptoPaymentServer(
            `/testnet/getSpecificCoin?userId=${userId}&currency=${currencyName}`
         );
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const fiatPaymentTransaction = createAsyncThunk(
   'payment/fiatPaymentTransaction',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(
            '/payment/create-fiat-payment-transaction',
            data
         );

         if (response?.data) {
            window.open(
               `${process.env.REACT_APP_FIAT_PAYMENT_APP_URL}?portal-id=${process.env.REACT_APP_PORTAL_ID}&order-id=${response?.data?.orderId}&`,
               '_blank'
            );
            dispatch(toggleUserWalletHandler(false));
            return response;
         }

         console.error(response);
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserFiatTransaction = createAsyncThunk(
   'payment/getUserFiatTransaction',
   async ({ userId, page }, { rejectWithValue }) => {
      try {
         const transactions = await axiosInstance.get(
            `/payment/get-user-fiat-deposit-transaction?userId=${userId}&page=${page}`
         );
         return transactions;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSelectedTransactionInfo = createAsyncThunk(
   'payment/getSelectedTransactionInfo',
   async ({ transactionId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-selected-transaction-info?transactionId=${transactionId}`
         );
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSelectedCryptoTransactionInfo = createAsyncThunk(
   'payment/getSelectedCryptoTransactionInfo',
   async ({ transactionId }, { rejectWithValue }) => {
      try {
         const response = await cryptoPaymentServer.get(
            `/testnet/get-detailed-transactions?id=${transactionId}`
         );
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSelectedPaymentFields = createAsyncThunk(
   'payment/getSelectedPaymentFields',
   async ({ selectedFiatPayment }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-selected-payment-fileds?selectedFiatPayment=${selectedFiatPayment}`
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const makeUserFiatWithdrawTransaction = createAsyncThunk(
   'payment/makeUserFiatWithdrawTransaction',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(
            '/payment/make-user-fiat-withdraw-transaction',
            data
         );

         if (response?.data?.orderId) {
            dispatch(toggleUserWalletHandler(false));
         }
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserFiatWithdrawTransactions = createAsyncThunk(
   'payment/getUserFiatWithdrawTransactions',
   async ({ page, userId }, { rejectWithValue }) => {
      try {
         const transactionResponse = await axiosInstance.get(
            `/payment/get-user-fiat-withdraw-transaction?page=${page}&userId=${userId}`
         );
         return transactionResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const withdrawCryptoCurrency = createAsyncThunk(
   'payment/withdrawCryptoCurrency',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const cryptoResponse = await cryptoPaymentServer.post(
            '/testnet/add-withdrawl',
            data
         );

         if (cryptoResponse?.data?.success && cryptoResponse?.data?.userId) {
            dispatch(toggleUserWalletHandler(false));
         }

         return cryptoResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserCryptoWithdrawTransactions = createAsyncThunk(
   'payment/getUserCryptoWithdrawTransactions',
   async ({ page }, { rejectWithValue }) => {
      try {
         const cryptoTransaction = await cryptoPaymentServer.get(
            `/testnet/get-withdrawl?page=${page}`
         );
         return cryptoTransaction;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserCryptoDepositTransactions = createAsyncThunk(
   'payment/getUserCryptoDepositTransactions',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await cryptoPaymentServer.get(
            `/testnet/get-deposite?page=${page}`
         );
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
