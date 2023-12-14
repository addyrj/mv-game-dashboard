import { createSelector } from '@reduxjs/toolkit';

const liveSupportReducer = (state) => state.liveSupport;

const authReducer = (state) => state.auth;

export const authSelector = createSelector([authReducer], (authSlice) => authSlice.auth);

export const supportTeamUserInfoSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamUserInfo
);

export const supportTeamUserInfoLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamUserInfoLoading
);

export const supportTeamUserInfoErrorSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamUserInfoError
);

export const supportTeamApprovedUsersSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamApprovedUsers
);

export const supportTeamApprovedUsersLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamApprovedUsersLoading
);

export const supportTeamApprovedUsersErrorSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.supportTeamApprovedUsersError
);
