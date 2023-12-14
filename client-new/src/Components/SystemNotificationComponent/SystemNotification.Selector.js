import { createSelector } from '@reduxjs/toolkit';

const notificationReducer = (state) => state.notification;

export const systemNotificationSelector = createSelector(
   [notificationReducer],
   (notificationSlice) => notificationSlice.systemNotification
);

export const systemNotificationLoadingSelector = createSelector(
   [notificationReducer],
   (notificationSlice) => notificationSlice.systemNotificationLoading
);

export const systemNotificationErrorSelector = createSelector(
   [notificationReducer],
   (notificationSlice) => notificationSlice.systemNotificationError
);
