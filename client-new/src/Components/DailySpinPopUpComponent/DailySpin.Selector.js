import { createSelector } from '@reduxjs/toolkit';

const authReducer = (state) => state.auth;

const luckyDrawReducer = (state) => state.luckyDraw;

export const authSelector = createSelector(
   [authReducer],
   (authSlice) => authSlice.auth
);

export const selectedDrawSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.selectedDraw
);
