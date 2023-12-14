import axiosInstance from '../../../Services/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createNewSystemNotification = createAsyncThunk(
   'notification/createNewSystemNotification',
   async ({ data }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/notification/create-new-system-notification',
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

export const getAllSystemNotification = createAsyncThunk(
   'notification/getAllSystemNotification',
   async ({ page }, { rejectWithValue }) => {
      try {
         const notifications = await axiosInstance.get(
            `/notification/get-all-system-notifications?page=${page}`
         );
         return notifications;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteSingleNotification = createAsyncThunk(
   'notification/deleteSingleNotification',
   async ({ notificationId }, { rejectWithValue }) => {
      try {
         const deleteResponse = await axiosInstance.delete(
            `/notification/delete-single-notification?id=${notificationId}`
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

export const getSingleNotificationInfo = createAsyncThunk(
   'notification/getSingleNotificationInfo',
   async ({ notificationId }, { rejectWithValue }) => {
      try {
         const singleNotification = await axiosInstance.get(
            `/notification/get-single-notification-info?id=${notificationId}`
         );
         return singleNotification;
      } catch (err) {
         if (err) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const updateSingleNotification = createAsyncThunk(
   'notification/updateSingleNotification',
   async ({ data, id }, { rejectWithValue }) => {
      try {
         const updateNotificaton = await axiosInstance.patch(
            '/notification/update-single-system-notification',
            { data, id }
         );
         return updateNotificaton;
      } catch (err) {
         if (err) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);
