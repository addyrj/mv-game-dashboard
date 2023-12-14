import { createSelector } from '@reduxjs/toolkit';

const notificationReducerSelector = (state) => state.notification;

export const systemNotificationsSelector = createSelector(
   [notificationReducerSelector],
   (notificationSlice) => notificationSlice.systemNotifications
);

export const systemNotificationsLoadingSelector = createSelector(
   [notificationReducerSelector],
   (notificationSlice) => notificationSlice.systemNotificationsLoading
);

export const notificationErrorSelector = createSelector(
   [notificationReducerSelector],
   (notificationSlice) => notificationSlice.notificationError
);
