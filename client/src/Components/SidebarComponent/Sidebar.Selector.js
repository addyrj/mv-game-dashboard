import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

const adminReducer = (state) => state.admin;

export const userRoleSelector = createSelector([adminReducer], (adminSlice) => adminSlice.userRole);

export const authSelector = createSelector([authReducerSelector], (authSlice) => authSlice.auth);
