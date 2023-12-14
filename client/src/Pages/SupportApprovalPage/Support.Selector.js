import { createSelector } from '@reduxjs/toolkit';

const liveSupportReducer = (state) => state.liveSupport;

const authReducer = (state) => state.auth;

export const authSelector = createSelector([authReducer], (authSlice) => authSlice.auth);

export const allQueryUserListsSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.allQueryUserLists
);

export const allQueryUserListsLoadingSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.allQueryUserListsLoading
);

export const allQueryUserListsErrorSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.allQueryUserListsError
);

export const showReasonPopupSelector = createSelector(
   [liveSupportReducer],
   (liveSupportSlice) => liveSupportSlice.showReasonPopup
);
