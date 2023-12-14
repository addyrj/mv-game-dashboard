import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

const adminReducer = (state) => state.admin;

const mediaRedudcer = (state) => state.media;

export const pickedImageSelector = createSelector([mediaRedudcer], (mediaSlice) => mediaSlice.pickedImage);

export const showSetPasswordPopupSelector = createSelector(
   [adminReducer],
   (adminSlice) => adminSlice.showSetPasswordPopup
);

export const createPlayerAccountInfoSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.createPlayerAccountInfo
);

export const createPlayerAccountLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.createPlayerAccountLoading
);

export const createPlayerAccountErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.createPlayerAccountError
);

export const createPlayerAccountInvalidErrorsSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.createPlayerAccountInvalidErrors
);

export const singleUserAccountInfoSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.singleUserAccountInfo
);

export const singleUserAccountLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.singleUserAccountLoading
);

export const singleUserAccountErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.singleUserAccountError
);

export const userRolesListSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userRolesList
);

export const userRolesListLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userRolesListLoading
);
