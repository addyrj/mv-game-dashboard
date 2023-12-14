import { createSlice } from '@reduxjs/toolkit';
import {
   getAllSystemNotification,
   deleteSingleNotification,
} from './notificationActions';

const INITAL_STATE = {
   systemNotifications: null,
   systemNotificationsLoading: false,
   notificationError: null,
   deleteSingleNotificationError: null,
   deleteSingleNotificationLoading: false,
};

const notificationSlice = createSlice({
   name: 'notification',
   initialState: INITAL_STATE,
   extraReducers: (bulder) => {
      bulder
         .addCase(getAllSystemNotification.pending, (state) => {
            state.systemNotifications = null;
            state.systemNotificationsLoading = true;
            state.notificationError = null;
         })
         .addCase(getAllSystemNotification.rejected, (state, action) => {
            state.systemNotifications = null;
            state.systemNotificationsLoading = false;
            state.notificationError = action.error.message;
         })
         .addCase(getAllSystemNotification.fulfilled, (state, action) => {
            state.systemNotifications = action.payload?.data;
            state.systemNotificationsLoading = false;
            state.notificationError = null;
         });

      bulder
         .addCase(deleteSingleNotification.pending, (state) => {
            state.deleteSingleNotificationError = null;
            state.deleteSingleNotificationLoading = true;
         })
         .addCase(deleteSingleNotification.rejected, (state, action) => {
            state.deleteSingleNotificationError = null;
            state.deleteSingleNotificationLoading = action?.error?.message;
         })
         .addCase(deleteSingleNotification.fulfilled, (state, action) => {
            const notificationId = action?.payload?.data?.id;

            if (notificationId) {
               state.systemNotifications = {
                  ...state.systemNotifications,
                  notifications:
                     state.systemNotifications?.notifications.filter(
                        (el) => el?._id !== notificationId
                     ),
               };
            }

            state.deleteSingleNotificationError = null;
            state.deleteSingleNotificationLoading = false;
         });
   },
});

export default notificationSlice.reducer;
