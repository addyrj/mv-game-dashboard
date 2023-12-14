import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);

export const signUpInfoSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.signUpInfo
);

export const signUpLoadingSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.signUpLoading
);

export const signUpErrorSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.signUpError
);

export const authFetchErrorSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.authFetchError
);

export const authLoadingSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.authLoading
);

export const invalidAuthErrorsSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.invalidAuthErrors
);

export const showOtpVarificationNotificationSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.showOtpVarificationNotification
);
