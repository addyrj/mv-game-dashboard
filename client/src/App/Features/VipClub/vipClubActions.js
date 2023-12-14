import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";


export const getRewardList = createAsyncThunk(
   'vipClub/getRewardList',
   async ({ rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/vip-club/get-all`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getCurrencyList = createAsyncThunk(
   'vipClub/getCurrencyList',
   async ({ rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/vip-club/currency/get`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const createReward = createAsyncThunk(
   'vipClub/createReward',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(`/vip-club/create`, data);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const editReward = createAsyncThunk(
   'vipClub/editReward',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(`/vip-club/update/${data._id}`,data );
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);