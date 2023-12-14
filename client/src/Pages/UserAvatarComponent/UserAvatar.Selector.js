import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const gameAvatarUploadInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameAvatarUploadInfo
);

export const gameAvatarUploadLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameAvatarUploadLoading
);

export const gameAvatarUploadErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameAvatarUploadError
);

export const gameAvatarSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameAvatar
);

export const gameAvatarLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameAvatarLoading
);

export const gameAvatarErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameAvatarError
);
