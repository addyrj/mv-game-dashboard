import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, {
   axioClientInstance,
} from '../../../Services/AxiosInstance';

export const GameCommentHandler = createAsyncThunk(
   'game/GameCommentHandler',
   async (data, { rejectWithValue }) => {
      try {
         const commentRespose = await axiosInstance.post(
            '/game/new-comment',
            data
         );

         return commentRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleGameComments = createAsyncThunk(
   'game/getSingleGameComments',
   async ({ gameId, userId }, { rejectWithValue }) => {
      try {
         const gameCommentsResponse = await axioClientInstance.get(
            `/game/get-single-game-comments?gameId=${gameId}&userId=${userId}`
         );

         return gameCommentsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const likeGameComment = createAsyncThunk(
   'game/likeGameComment',
   async ({ userId, gameId, commentId }, { rejectWithValue }) => {
      try {
         const likeResponse = await axiosInstance.patch(
            '/game/like-game-comments',
            {
               userId,
               gameId,
               commentId,
            }
         );

         return likeResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const SearchGames = createAsyncThunk(
   'game/SearchGames',
   async ({ inputValue }, { rejectWithValue }) => {
      try {
         const gameRespose = await axioClientInstance.get(
            `/game/search-game?search=${inputValue}`
         );

         return gameRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getQeuryGames = createAsyncThunk(
   'games/getQeuryGames',
   async ({ query, page }, { rejectWithValue }) => {
      try {
         const queryGamesResponse = await axioClientInstance.get(
            `/game/get-query-games?q=${query}&page=${page}`
         );

         return queryGamesResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const storeRecentGames = createAsyncThunk(
   'game/storeRecentGames',
   async ({ gameId, userId }, { rejectWithValue }) => {
      try {
         const storeGamesRespose = await axiosInstance.patch(
            `/game/store-recent-games`,
            { gameId, userId }
         );

         // console.log(storeGamesRespose);
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getRecentPlayGames = createAsyncThunk(
   'game/getRecentPlayGames',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const recentplayGamesRespose = await axiosInstance.get(
            `/game/get-recent-games?userId=${userId}`
         );

         return recentplayGamesRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getFavoriteGames = createAsyncThunk(
   'game/getFavoriteGames',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const gamesResponse = await axiosInstance.get(
            `/game/get-favorite-games?userId=${userId}`
         );

         return gamesResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteSingleRecentGame = createAsyncThunk(
   'game/deleteSingleRecentGame',
   async ({ gameId, userId }, { rejectWithValue }) => {
      try {
         const deleteResponse = await axiosInstance.delete(
            `/game/delete-single-recent-play-games?gameId=${gameId}&userId=${userId}`
         );

         return deleteResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getTopRatedGames = createAsyncThunk(
   'game/getTopRatedGames',
   async (_, { rejectWithValue }) => {
      try {
         const topRatedGamesResponse = await axioClientInstance.get(
            '/game/get-top-rated-games'
         );

         return topRatedGamesResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleProviderGames = createAsyncThunk(
   'game/getSingleProviderGames',
   async ({ page, providerName }, { rejectWithValue }) => {
      try {
         const gameProviderRespose = await axioClientInstance.get(
            `/game/get-single-provider-games?page=${page}&providerName=${providerName}`
         );
         return gameProviderRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllGamesLists = createAsyncThunk(
   'game/getAllGamesLists',
   async ({ page, filterBy }, { rejectWithValue }) => {
      try {
         const slotsGamesRespose = await axioClientInstance.get(
            `/game/get-all-games-lists?page=${page}&filterBy=${filterBy}`
         );
         return slotsGamesRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getPopularGames = createAsyncThunk(
   'game/getPopularGames',
   async ({ filter, page }, { rejectWithValue }) => {
      try {
         const gamesResponse = await axioClientInstance.get(
            `/game/get-popular-games?filter=${filter}&page=${page}`
         );
         return gamesResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const filterByNameGames = createAsyncThunk(
   'game/filterByNameGames',
   async ({ filter, page, sortWith }, { rejectWithValue }) => {
      try {
         const filterData = await axioClientInstance.get(
            `/game/get-filter-by-name-games?filter=${filter}&page=${page}&sortWith=${sortWith}`
         );
         return filterData;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllGamesProviersWithGameCounts = createAsyncThunk(
   'game/getAllGamesProviersWithGameCounts',
   async ({ searchCollection }, { rejectWithValue }) => {
      try {
         const gameProviderRespose = await axioClientInstance.get(
            `/game/get-all-game-providers?searchCollection=${searchCollection}`
         );
         return gameProviderRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSelectedProviderGames = createAsyncThunk(
   'game/getSelectedProviderGames',
   async ({ SelectedProvider, page, filterBy }, { rejectWithValue }) => {
      try {
         const selectedProvidersGamesRespose = await axioClientInstance.post(
            '/game/get-selected-provider-games',
            { SelectedProvider, page, filterBy }
         );

         return selectedProvidersGamesRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const allGamesLists = createAsyncThunk(
   'games/allGamesLists',
   async ({ page }, { rejectWithValue }) => {
      try {
         const allGamesRespose = await axioClientInstance.get(
            `/game/all-games-list?page=${page}`
         );
         return allGamesRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getNewReleasesGames = createAsyncThunk(
   'games/getNewReleasesGames',
   async ({ page }, { rejectWithValue }) => {
      try {
         const gamesLists = await axioClientInstance.get(
            `/game/get-new-releases-games?page=${page}`
         );
         return gamesLists;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
