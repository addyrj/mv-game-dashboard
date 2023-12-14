import { createSelector } from '@reduxjs/toolkit';

const mediaReducer = (state) => state.media;

const authReducer = (state) => state.auth;

export const showPickerPopUpSelector = createSelector([mediaReducer], (mediaSlice) => mediaSlice.showPickerPopUp);

export const authSelector = createSelector([authReducer], (authSlice) => authSlice.auth);
