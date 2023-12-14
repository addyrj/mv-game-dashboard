import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { axiosClientInstance, cryptoPaymentServer } from '../../../Services/AxiosInstance';

export const getUserSingleAccount = createAsyncThunk(
   'userManagement/getUserSingleAccount',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/userManagement/get-single-user-account?userId=${userId}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updatePlayerAccount = createAsyncThunk(
   'userManagement/updatePlayerAccount',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch('/userManagement/update-player-account', data, {
            validateStatus: false,
         });
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const createPlayerAccount = createAsyncThunk(
   'userManagement/createPlayerAccount',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('userManagement/create-player-account', data, {
            validateStatus: false,
         });
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const setPlayerAccountPassword = createAsyncThunk(
   'userManagement/setPlayerAccountPassword',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch('/userManagement/set-account-password', data);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserSingleAccountInformation = createAsyncThunk(
   'userManagement/getUserAccountStatus',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/userManagement/get-user-account-information?userId=${userId}`);
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
   'userManagement/getUserAllFiatCurrency',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const allCurrencyResponse = await axiosClientInstance.get(
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

export const getUserFiatWithdrawTransactions = createAsyncThunk(
   'userManagement/getUserFiatWithdrawTransactions',
   async ({ page, userId }, { rejectWithValue }) => {
      try {
         const transactionResponse = await axiosClientInstance.get(
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

export const getUserCryptoWithdrawTransactions = createAsyncThunk(
   'userManagement/getUserCryptoWithdrawTransactions',
   async ({ userId, page }, { rejectWithValue }) => {
      try {
         const cryptoTransaction = await cryptoPaymentServer.get(
            `/testnet/get-withdrawl-admin?userId=${userId}&page=${page}`
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
   'userManagement/getUserCryptoDepositTransactions',
   async ({ userId, page }, { rejectWithValue }) => {
      try {
         const response = await cryptoPaymentServer.get(`/testnet/get-deposite-admin?userId=${userId}&page=${page}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserSelectedCurrency = createAsyncThunk(
   'userManagement/getUserSelectedCurrency',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const response = await axiosClientInstance.get(`/client/get-user-selected-currency?userId=${userId}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserFiatTransaction = createAsyncThunk(
   'userManagement/getUserFiatTransaction',
   async ({ userId, page }, { rejectWithValue }) => {
      try {
         const transactions = await axiosClientInstance.get(
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

export const getUserAllCryptoCurrency = createAsyncThunk(
   'userManagement/getUserCryptoCurrencyInfo',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const userCryptoCurrencyList = await cryptoPaymentServer.get(`/testnet/userInfo?userId=${userId}`);
         return userCryptoCurrencyList;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getPrivacyFieldStatus = createAsyncThunk(
   'userManagement/getPrivacyFieldStatus',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const getPrivacyFiledsResponse = await axiosClientInstance.get(
            `/client/get-privacy-fileds-status?userId=${userId}`
         );
         return getPrivacyFiledsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllGlobalChatGroups = createAsyncThunk(
   'userManagement/getAllGlobalGroups',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/userManagement/get-all-global-chat-groups');
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserGlobalChats = createAsyncThunk(
   'userManagement/getUserGlobalChats',
   async ({ userId, groupId, page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/userManagement/get-user-global-chats?userId=${userId}&groupId=${groupId}&page=${page}`
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

export const getUserFriendList = createAsyncThunk(
   'userManagement/getFriendList',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const friendListResponse = await axiosClientInstance.get(`/client/get-friends?userId=${userId}`);
         return friendListResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserWageredAmountGraph = createAsyncThunk(
   'userManagement/getUserWageredAmountGraph',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/userManagement/get-user-wagered-amount?userId=${userId}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserRoleLists = createAsyncThunk('userManagement/getUserRoleLists', async (_, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get('/userManagement/get-user-roles-lists');
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getUserByRoles = createAsyncThunk(
   'userManagement/getUserByRoles',
   async ({ filter }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/userManagement/get-user-by-roles?filter=${filter}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
