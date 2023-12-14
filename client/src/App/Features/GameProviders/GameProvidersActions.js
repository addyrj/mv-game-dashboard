import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const createNewGameProvider = createAsyncThunk(
   'game-provider/CreateNewGameProvider',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const providerResponse = await axiosInstance.post(
            '/game-provider/create-new-game-provider',
            formData,
            { validateStatus: false }
         );
         return providerResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllGameProviders = createAsyncThunk(
   'game-provider/getAllGameProviders',
   async ({ page }, { rejectWithValue }) => {
      try {
         const gameProvidersResponse = await axiosInstance.get(
            `/game-provider/get-games-providers?page=${page}`
         );
         return gameProvidersResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleGameProvider = createAsyncThunk(
   'game-provider/editGameProvider',
   async ({ _id }, { rejectWithValue }) => {
      try {
         const gameProviderResponse = await axiosInstance.get(
            `/game-provider/get-single-game-provider?gameProviderId=${_id}`
         );
         return gameProviderResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateGameProvider = createAsyncThunk(
   'game-provider/udpateGameProvider',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const updateProviderRespose = await axiosInstance.patch(
            '/game-provider/update-game-provider',
            formData,
            { validateStatus: false }
         );
         return updateProviderRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const blockSingleGameProvider = createAsyncThunk(
   'game-provider/deleteSingleGameProvider',
   async ({ _id }, rejectWithValue) => {
      try {
         const blockSingleGameProviderRespose = await axiosInstance.patch(
            `/game-provider/block-single-game-provider`,
            { providerId: _id }
         );

         return blockSingleGameProviderRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const unblockSingleGameProvider = createAsyncThunk(
   'game-provider/deleteSingleGameProvider',
   async ({ _id }, rejectWithValue) => {
      try {
         const unblockSingleGameProviderResponse = await axiosInstance.patch(
            `/game-provider/unblock-single-game-provider`,
            { providerId: _id }
         );

         return unblockSingleGameProviderResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getProvidersGames = createAsyncThunk(
   'game-provider/getProvidersGames',
   async ({ providerId, page }, { rejectWithValue }) => {
      try {
         const providerGamesResponse = await axiosInstance.get(
            `/game-provider/get-game-providers-games?providerId=${providerId}&page=${page}`
         );
         return providerGamesResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
