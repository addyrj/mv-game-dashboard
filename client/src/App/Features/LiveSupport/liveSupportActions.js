import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { axiosClientInstance } from '../../../Services/AxiosInstance';

export const getAllQueryUserLists = createAsyncThunk(
   'liveSupport/getAllQueryUserLists',
   async ({ supportTeamUserId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/support/get-all-query-users-list?supportTeamUserId=${supportTeamUserId}`
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

export const getQueryUserChats = createAsyncThunk(
   'liveSupport/getQueryUserChats',
   async ({ userId, page, chatFrom }, { rejectWithValue }) => {
      try {
         const response = await axiosClientInstance.get(
            `/chatBot/get-chats?userId=${userId}&page=${page}&chatFrom=${chatFrom}`
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

export const getQueryUsersLists = createAsyncThunk(
   'liveSupport/getQueryUserLists',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/support/get-query-users-lists?page=${page}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updatedUserQuery = createAsyncThunk('liveSupport/updatedUserQuery', async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.patch(`/support/updated-user-query`, data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const updateUserQueryFeedBack = createAsyncThunk(
   'liveSupport/updateUserQueryFeedBack',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(`/support/update-user-query-feedback`, data);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSupportTeamUserInfo = createAsyncThunk(
   'liveSupport/getSupportTeamUserInfo',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/support/get-support-team-user-info?userId=${userId}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSupportTeamApprovedUsers = createAsyncThunk(
   'liveSupport/getSupportTeamApprovedUsers',
   async ({ supportTeamUserId, page, filter }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/support/get-support-team-activities-users-lists?supportTeamUserId=${supportTeamUserId}&page=${page}&filterBy=${filter}`
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

export const getSupportTeamFeedbacks = createAsyncThunk(
   'liveSupport/getSupportTeamFeedbacks',
   async ({ supportTeamUserId, page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/support/get-support-team-feedbacks?supportTeamUserId=${supportTeamUserId}&page=${page}`
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

export const getSupportTeamConversion = createAsyncThunk(
   'liveSupport/getSupportTeamConversion',
   async ({ queryId, page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/support/get-support-team-conversion?queryId=${queryId}&page=${page}`
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
