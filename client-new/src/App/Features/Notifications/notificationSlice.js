import { createSlice } from '@reduxjs/toolkit';
import { getAllSystemNotifications } from './notificationActions';

const INITAL_STATE = {
   systemNotification: null,
   systemNotificationLoading: false,
   systemNotificationError: null,
};

const notificationSlice = createSlice({
   name: 'notifications',
   initialState: INITAL_STATE,
   reducers: {
      pushSystemNotifications: (state, action) => {
         state.systemNotification = {
            ...state.systemNotification,
            notifications: [
               action.payload,
               ...state.systemNotification?.notifications,
            ],
         };
      },
      pullSystemNotifications: (state, action) => {
         const notificationId = action.payload?.notificationId;

         state.systemNotification = {
            ...state.systemNotification,
            notifications: state.systemNotification?.notifications.filter(
               (el) => el?._id !== notificationId
            ),
         };
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getAllSystemNotifications.pending, (state) => {
            state.systemNotification = null;
            state.systemNotificationLoading = true;
            state.systemNotificationError = null;
         })
         .addCase(getAllSystemNotifications.rejected, (state, action) => {
            state.systemNotification = null;
            state.systemNotificationLoading = false;
            state.systemNotificationError = action.error?.message;
         })
         .addCase(getAllSystemNotifications.fulfilled, (state, action) => {
            state.systemNotification = action.payload?.data;
            state.systemNotificationLoading = false;
            state.systemNotificationError = null;
         });
   },
});

export const { pushSystemNotifications, pullSystemNotifications } =
   notificationSlice.actions;

export default notificationSlice.reducer;
