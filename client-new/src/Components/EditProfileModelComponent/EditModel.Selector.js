import { createSelector } from '@reduxjs/toolkit';

const selectClientReducer = (state) => state.client;

export const userInfoSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.userInfo
);

export const fetchUserInfoErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.fetchUserInfoError
);

export const updateUserNameSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.updateUserName
);

export const updateUserNameLoadingSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.updateUserNameLoading
);

export const fetchUpdateUserNameErrorSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.fetchUpdateUserNameError
);

export const updateUserNameInvalidErrorsSelector = createSelector(
   [selectClientReducer],
   (clientSlice) => clientSlice.updateUserNameInvalidErrors
);
