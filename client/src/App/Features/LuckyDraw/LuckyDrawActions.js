import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const createNewLuckyDraw = createAsyncThunk('luckyDraw/createNewLuckyDraw', async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.post('/lucky-draw/create-new-lucky-draw', data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const updateSpinLuckyDraw = createAsyncThunk('luckyDraw/updateSpinItem', async ({ data, id }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.patch(`/lucky-draw/update-lucky-draw?id=${id}`, data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getAllLuckyDraw = createAsyncThunk('luckyDraw/getAllLuckyDraw', async ({ page }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/lucky-draw/get-all-lucky-draw?page=${page}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getSingleLuckyDraw = createAsyncThunk('luckyDraw/getSingleLuckyDraw', async ({ id }, { rejectWithValue }) => {
   try {
      const singleLuckyDrawResponse = await axiosInstance.get(`/lucky-draw/get-single-lucky-draw?id=${id}`);
      return singleLuckyDrawResponse;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getAllLotteryPoll = createAsyncThunk('luckyDraw/getAllLotteryPoll', async ({ page }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/lucky-draw/get-all-lottery-poll?page=${page}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getSingleLuckyDrawPoll = createAsyncThunk(
   'luckyDraw/getSingleLuckyDrawPoll',
   async ({ gameId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/lucky-draw/get-single-lucky-draw-poll?gameId=${gameId}`);

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateLuckyDrawPollResult = createAsyncThunk(
   'luckyDraw/updateLuckyDrawPollResult',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch('/lucky-draw/update-lucky-draw-poll-result', data);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleLotteryDrawUsersList = createAsyncThunk(
   'luckyDraw/getSingleLotteryDrawUsersList',
   async ({ gameId, filter, page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/lucky-draw/get-single-lucky-draw-users-lists?gameId=${gameId}&filter=${filter}&page=${page}`
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

export const getUserTicketLuckyNumbersCount = createAsyncThunk(
   'luckyDraw/getUserTicketLuckyNumbersCount',
   async ({ gameId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/lucky-draw/get-single-lottery-poll-users-lucky-numbers?gameId=${gameId}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserTicketJackpotNumbersCount = createAsyncThunk(
   'luckyDraw/getUserTicketJackpotNumbersCount',
   async ({ gameId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/lucky-draw/get-single-lottery-poll-users-jackpot-numbers?gameId=${gameId}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
