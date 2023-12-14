import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getChatGroups = createAsyncThunk(
   'group/getChatGroups',
   async (_, { rejectWithValue }) => {
      try {
         const chatGroupsResponse = await axiosInstance.get(
            '/group/get-chat-groups'
         );
         return chatGroupsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getGroupChats = createAsyncThunk(
   'group/getGroupChats',
   async ({ groupId, page }, { rejectWithValue }) => {
      try {
         const groupChatsResponse = await axiosInstance.get(
            `/group/get-groups-chats?groupId=${groupId}&page=${page}`
         );

         return groupChatsResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
