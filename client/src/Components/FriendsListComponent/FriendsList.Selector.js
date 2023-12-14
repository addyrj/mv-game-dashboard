import { createSelector } from '@reduxjs/toolkit';

const userManagementReducer = (state) => state.userManagement;

export const userFriendsListSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userFriendsList
);

export const userFriendsFetchLoadingSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userFriendsFetchLoading
);

export const userFriendsFetchErrorSelector = createSelector(
   [userManagementReducer],
   (userManagementSlice) => userManagementSlice.userFriendsFetchError
);
