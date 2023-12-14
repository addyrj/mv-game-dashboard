import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

export const userInfoSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.userInfo
);

export const fetchUserInfoLoadingSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.fetchUserInfoLoading
);

export const fetchUserInfoErrorSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.fetchUserInfoError
);

export const updateUserNameSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.updateUserName
);
