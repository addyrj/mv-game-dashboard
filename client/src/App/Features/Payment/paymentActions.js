import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getCurrencyPaymentOptions = createAsyncThunk(
   'payment/getCurrencyPaymentOptions',
   async ({ page }, { rejectWithValue }) => {
      try {
         const currencyResponse = await axiosInstance.get(
            `/payment/get-currency-payment-options?page=${page}`
         );
         return currencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const insertNewCurrencyPaymentOption = createAsyncThunk(
   'payment/insertNewCurrencyPaymentOption',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/payment/insert-new-currency-payment-options',
            formData
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

export const getSinglePaymentCurrencyOption = createAsyncThunk(
   'payment/getSinglePaymentCurrencyOption',
   async ({ _id }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-single-currency-payment-method?optionId=${_id}`
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

export const updatePaymentOption = createAsyncThunk(
   'payment/updatePaymentOption',
   async ({ formData, _id }, { rejectWithValue }) => {
      try {
         const updateResponse = await axiosInstance.patch(
            `/payment/update-single-payment-option?optionId=${_id}`,
            formData
         );
         return updateResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllPaymentOptionList = createAsyncThunk(
   'payment/getAllPaymentOptionList',
   async (_, { rejectWithValue }) => {
      try {
         const paymentOptionsResposne = await axiosInstance.get(
            '/payment/get-all-payment-option-list'
         );
         return paymentOptionsResposne;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllFiatDepositTransactions = createAsyncThunk(
   'payment/getAllFiatDepositTransactions',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-all-fiat-deposit-transactions?page=${page}`
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

export const getSingleOrderInfo = createAsyncThunk(
   'payment/getSingleOrderInfo',
   async ({ orderId }, { rejectWithValue }) => {
      try {
         const orderResponse = await axiosInstance.get(
            `/payment/get-single-order-info?orderId=${orderId}`
         );

         return orderResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const createNewPaymentOptionField = createAsyncThunk(
   'payment/createNewPaymentOptionField',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/payment/create-new-payment-options-filed',
            data
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

export const getAllPaymentOptionFields = createAsyncThunk(
   'payment/createNewPaymentOptionField',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-all-payment-options-fields?page=${page}`
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

export const deletePaymentOptionsFiled = createAsyncThunk(
   'payment/deletePaymentOptionsField',
   async ({ fieldId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/payment/delete-single-payment-filed?fieldId=${fieldId}`
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

export const getSinglePaymentOptionField = createAsyncThunk(
   'payment/getSinglePaymentOptionField',
   async ({ fieldId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-single-payment-option-field?fieldId=${fieldId}`
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

export const updatePaymentOptionField = createAsyncThunk(
   'payment/updatePaymentOptionField',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            '/payment/update-single-payment-option-field',
            data
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

export const getAllPaymentOptionFieldsList = createAsyncThunk(
   'payment/getAllPaymentOptionFieldsList',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/payment/get-all-payment-options-field-list'
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

export const getAllFiatWithdrawTransaction = createAsyncThunk(
   'payment/getAllFiatWithdrawTransaction',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-all-fiat-withdraw-transaction?page=${page}`
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

export const updateFiatWithdrawTransaction = createAsyncThunk(
   'payment/updateFiatWithdrawTransaction',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            '/payment/update-fiat-withdraw-transaction',
            data
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
