import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

const authReducerSelector = (state) => state.auth;

export const updateAvatarSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.updateAvatar
);

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const toggleUserProfileInfoSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.toggleUserProfileInfo
);
