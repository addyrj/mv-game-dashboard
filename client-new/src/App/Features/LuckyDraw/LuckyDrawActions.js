import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, {
   axioClientInstance,
} from '../../../Services/AxiosInstance';

export const getEnableDraw = createAsyncThunk(
   'luckyDraw/getEnableDraw',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axioClientInstance.get(
            '/lucky-draw/get-spin-draw'
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

export const getUserDailySpinInfo = createAsyncThunk(
   'luckyDraw/getUserDailySpinInfo',
   async ({ userId, drawId }, { rejectWithValue }) => {
      try {
         let getUserSpininfoResponse;

         if (!userId) {
            getUserSpininfoResponse = await axioClientInstance.get(
               `/lucky-draw/get-user-daily-spin-information`
            );
         } else {
            getUserSpininfoResponse = await axiosInstance.get(
               `/lucky-draw/get-user-daily-spin-information?userId=${userId}&drawId=${drawId}`
            );
         }
         return getUserSpininfoResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getLuckSpinDrawInfo = createAsyncThunk(
   'luckyDraw/getLuckSpinDrawInfo',
   async ({ selectedDraw }, { rejectWithValue }) => {
      try {
         const response = await axioClientInstance.get(
            `/lucky-draw/get-lucky-spin-draw-info?selectedDraw=${selectedDraw}`
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

export const luckySpinHandler = createAsyncThunk(
   'luckyDraw/luckySpinHandler',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/lucky-draw/get-lucky-draw-amount`,
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
