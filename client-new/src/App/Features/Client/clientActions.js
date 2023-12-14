import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';
import { axioClientInstance } from '../../../Services/AxiosInstance';
import { updateUserInfo } from '../Auth/authSlice';

export const getUserInformation = createAsyncThunk(
   'client/getUserInformation',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const userInformationResponse = await axiosInstance.get(
            `/client/get-user-information?userId=${userId}`
         );
         return userInformationResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSelectedUserInfo = createAsyncThunk(
   'client/getSelectedUserInfo',
   async ({ userId, selectedUserId }, { rejectWithValue }) => {
      try {
         const infoResponse = await axiosInstance.get(
            `/client/get-selected-user-info?userId=${userId}&selectedUserId=${selectedUserId}`
         );
         return infoResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllMadels = createAsyncThunk(
   'client/getAllMadels',
   async (_, { rejectWithValue }) => {
      try {
         const allMadelRespose = await axiosInstance.get(
            '/client/get-all-madels'
         );
         return allMadelRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateUserNameHander = createAsyncThunk(
   'client/updateUserName',
   async ({ userId, userName }, { rejectWithValue, dispatch }) => {
      try {
         const updateResponse = await axiosInstance.patch(
            '/client/update-username',
            {
               userId,
               userName,
            },
            {
               validateStatus: false,
            }
         );

         if (updateResponse) {
            document.cookie = `_mv_games_auth=${JSON.stringify(
               updateResponse?.data?.auth
            )}`;

            dispatch(updateUserInfo({ data: updateResponse?.data?.auth }));

            return updateResponse;
         }
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateAvatarHandler = createAsyncThunk(
   'client/updateAvatarHandler',
   async (
      { selectedImage, userId, formData = undefined },
      { rejectWithValue, dispatch }
   ) => {
      try {
         if (!!selectedImage) {
            const updateAvatarRes = await axiosInstance.post(
               '/client/update-avatar',
               {
                  selectedImage,
                  userId,
               }
            );

            if (updateAvatarRes) {
               document.cookie = `_mv_games_auth=${JSON.stringify(
                  updateAvatarRes?.data?.auth
               )}`;

               dispatch(
                  updateUserInfo({
                     data: { avatar: updateAvatarRes?.data?.avatar },
                  })
               );

               return updateAvatarRes;
            }
         }

         if (formData) {
            const updateAvatarRes = await axiosInstance.post(
               '/client/update-avatar',
               formData,
               {
                  headers: {
                     'Content-type': 'multipart/form-data',
                  },
               }
            );
            if (updateAvatarRes) {
               document.cookie = `_mv_games_auth=${JSON.stringify(
                  updateAvatarRes?.data?.auth
               )}`;

               return updateAvatarRes;
            }
         }
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getPrivacyFieldStatus = createAsyncThunk(
   'client/getPrivacyFieldStatus',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const getPrivacyFiledsResponse = await axiosInstance.get(
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

export const profilePrivacyHandler = createAsyncThunk(
   'client/profilePrivacyHandler',
   async ({ field, value, userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            `/client/update-privacy?field=${field}&value=${value}&userId=${userId}`
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

export const getFriendRequestList = createAsyncThunk(
   'client/getFriendRequestList',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const requestListsResponse = await axiosInstance.get(
            `/client/get-friend-request-list?userId=${userId}`
         );
         return requestListsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getFriendList = createAsyncThunk(
   'client/getFriendList',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const friendListResponse = await axiosInstance.get(
            `/client/get-friends?userId=${userId}`
         );
         return friendListResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getPrivateMessages = createAsyncThunk(
   'client/getPrivatMessages',
   async ({ userId, selectedUserId, page }, { rejectWithValue }) => {
      try {
         const msgResponse = await axiosInstance.get(
            `/client/get-private-messages?userId=${userId}&selectedUserId=${selectedUserId}&page=${page}`
         );
         return msgResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUsersAvatars = createAsyncThunk(
   'client/getUsersAvatars',
   async (_, { rejectWithValue }) => {
      try {
         const avatarResponse = await axiosInstance.get(
            '/client/get-user-avatar'
         );
         return avatarResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllGames = createAsyncThunk(
   'client/getAllGames',
   async (_, { rejectWithValue }) => {
      try {
         const gamesResponse = await axioClientInstance.get(
            '/game/get-all-games'
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

export const getCommingSoonGames = createAsyncThunk(
   'client/getCommingSoonGames',
   async (_, { rejectWithValue }) => {
      try {
         const gameLists = await axioClientInstance.get(
            '/game/get-cooming-soon-games'
         );
         return gameLists;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleGameInfo = createAsyncThunk(
   'client/getSingleGameInfo',
   async ({ gameId, userId }, { rejectWithValue }) => {
      try {
         const url = `/game/get-single-game?gameId=${gameId}${
            !!userId ? `&userId=${userId}` : ''
         }`;
         const gamesResponse = await axioClientInstance.get(url);

         return gamesResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const genrateGameToken = createAsyncThunk(
   'client/genrateGameToken',
   async (data, { rejectWithValue }) => {
      try {
         const gameToken = await axiosInstance.post(
            `/game/genrate-game-token`,
            data
         );

         return gameToken;
      } catch (err) {
         if (err) {
            return rejectWithValue(err.response.data);
         }
      }
   }
);

export const FavoriteGameHandler = createAsyncThunk(
   'client/FavoriteHandler',
   async ({ userId, gameId }, { rejectWithValue }) => {
      try {
         const FavoriteRespose = await axiosInstance.post(
            '/game/favorite-game',
            {
               userId,
               gameId,
            }
         );

         return FavoriteRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const GameLikeHandler = createAsyncThunk(
   'client/GameLikeHandler',
   async ({ userId, gameId }, { rejectWithValue }) => {
      try {
         const likeGameRespose = await axiosInstance.post('/game/like-game', {
            userId,
            gameId,
         });

         return likeGameRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllCategory = createAsyncThunk(
   'client/getAllCategory',
   async (_, { rejectWithValue }) => {
      try {
         const categoryRespose = await axioClientInstance.get(
            '/client/get-all-category'
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

export const getGamesEnableCategory = createAsyncThunk(
   'client/getGamesEnableCategory',
   async (_, { rejectWithValue }) => {
      try {
         const category = await axioClientInstance.get(
            '/client/get-games-category'
         );

         return category;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const setUserSelectedCurrency = createAsyncThunk(
   'client/setUserSelectedCurrency',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            '/client/set-selected-currency',
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

export const getUserSelectedCurrency = createAsyncThunk(
   'client/getUserSelectedCurrency',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/client/get-user-selected-currency?userId=${userId}`
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
