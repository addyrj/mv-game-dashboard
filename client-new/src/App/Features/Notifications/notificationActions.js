import { createAsyncThunk } from '@reduxjs/toolkit';
import { axioClientInstance } from '../../../Services/AxiosInstance';

export const getAllSystemNotifications = createAsyncThunk(
   'notification/getAllSystemNotifications',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axioClientInstance.get(
            '/notification/get-all-system-notification'
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
