import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const insertNewGame = createAsyncThunk(
   'games/insertNewGame',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const insertNewGameResponse = await axiosInstance.post(
            '/games/insert-new-game',
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return insertNewGameResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getGamesLists = createAsyncThunk(
   'games/getGamesLists',
   async ({ page }, { rejectWithValue }) => {
      try {
         const gameListResponse = await axiosInstance.get(
            `/games/get-games?page=${page}`
         );
         return gameListResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleGameInfo = createAsyncThunk(
   'games/getSingleGameInfo',
   async ({ gameId }, { rejectWithValue }) => {
      try {
         const gameResponse = await axiosInstance.get(
            `/games/get-single-game?gameId=${gameId}`
         );
         return gameResponse;
      } catch (err) {
         if (err) {
            console.log(err);
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateSingleGame = createAsyncThunk(
   'games/updateSingleGame',
   async ({ gameId, formData }, { rejectWithValue }) => {
      try {
         const updateGameInfo = await axiosInstance.patch(
            `/games/update-single-game?gameId=${gameId}`,
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return updateGameInfo;
      } catch (err) {
         if (err) {
            console.log(err);
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteSingleGame = createAsyncThunk(
   'games/deleteSingleGame',
   async ({ gameId }, { rejectWithValue }) => {
      try {
         const deleteGameResponse = await axiosInstance.delete(
            `/games/delete-single-game?gameId=${gameId}`
         );
         return deleteGameResponse;
      } catch (err) {
         if (err) {
            console.log(err);
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getGameProvidersList = createAsyncThunk(
   'games/getGameProvidersList',
   async () => {
      try {
         const providerResponse = await axiosInstance.get(
            '/games/get-games-providers-lists'
         );

         return providerResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
      }
   }
);

export const getTopFavoriteGames = createAsyncThunk(
   'games/getTopFavoriteGames',
   async (_, { rejectWithValue }) => {
      try {
         const gameResponse = await axiosInstance.get(
            '/games/get-top-favorite-games'
         );
         return gameResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getGameCurrencysList = createAsyncThunk(
   'games/getGameCurrencysList',
   async ({ page }, { rejectWithValue }) => {
      try {
         const gameCurrencyList = await axiosInstance.get(
            `/game-currency/get-game-currency?page=${page}`
         );

         return gameCurrencyList;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const inertNewGameCurrency = createAsyncThunk(
   'games/inertNewGameCurrency',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const insertGameCurrencyResponse = await axiosInstance.post(
            '/game-currency/insert-currency',
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return insertGameCurrencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteSingleGameCurrency = createAsyncThunk(
   'games/deleteSingleGameCurrency',
   async ({ id }, { rejectWithValue }) => {
      try {
         const deleteSingleGameCurrencyResponse = await axiosInstance.delete(
            `/game-currency/delete-single-game-currency?id=${id}`
         );

         return deleteSingleGameCurrencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleGameCurrency = createAsyncThunk(
   'games/getSingleGameCurrency',
   async ({ id }, { rejectWithValue }) => {
      try {
         const currencyResponse = await axiosInstance.get(
            `/game-currency/get-single-game-currency?id=${id}`
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

export const updateSingleGameCurrency = createAsyncThunk(
   'games/updateSingleGameCurrency',
   async ({ id, formData }, { rejectWithValue }) => {
      try {
         const updateCurrencyResponse = await axiosInstance.patch(
            `/game-currency/update-single-currency?id=${id}`,
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return updateCurrencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllGamesCategroy = createAsyncThunk(
   'games/getAllGamesCategroy',
   async (_, { rejectWithValue }) => {
      try {
         const categoryRespose = await axiosInstance.get(
            '/games/get-games-all-category'
         );
         return categoryRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const postNewGameCategory = createAsyncThunk(
   'games/postNewGameCategory',
   async (data, { rejectWithValue }) => {
      try {
         const categoryRespose = await axiosInstance.post(
            '/games/post-new-game-category',
            data
         );
         return categoryRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateGameCategory = createAsyncThunk(
   'games/updateGameCategory',
   async (data, { rejectWithValue }) => {
      try {
         const gameResponse = await axiosInstance.patch(
            '/games/update-game-category',
            data
         );
         return gameResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllProductsCategory = createAsyncThunk(
   'games/getAllProductsCategory',
   async ({ page }, { rejectWithValue }) => {
      try {
         const allGamesCategory = await axiosInstance.get(
            `/games/get-all-games-category?page=${page}`
         );
         return allGamesCategory;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSinglegameCategory = createAsyncThunk(
   'games/getSinglegameCategor',
   async ({ gameCategoryId }, { rejectWithValue }) => {
      try {
         const singleCategoryRespose = await axiosInstance.get(
            `/games/get-single-game-category?categoryId=${gameCategoryId}`
         );
         return singleCategoryRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteSingleGameCategory = createAsyncThunk(
   'games/deleteSinglegameCategory',
   async ({ gameCategoryId }, { rejectWithValue }) => {
      try {
         const deleteCategory = await axiosInstance.delete(
            `/games/delete-single-game-categroy?gameCategoryId=${gameCategoryId}`
         );
         return deleteCategory;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllCurrencyList = createAsyncThunk(
   'gamecurrency/getAllCurrencyList',
   async (_, { rejectWithValue }) => {
      try {
         const allCurrencyList = axiosInstance.get(
            '/game-currency/get-all-currency-list'
         );
         return allCurrencyList;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getGameCurrency = createAsyncThunk(
   'gamecurrency/getGameCurrency',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/game-currency/get-game-currency-list'
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
