import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const newRoleInsertInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.newRoleInsertInfo
);

export const newRoleInsertLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.newRoleInsertLoading
);

export const newRoleInsertErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.newRoleInsertError
);

export const newRoleInsertInvalidErrorsSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.newRoleInsertInvalidErrors
);

export const singleRoleSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.singleRole
);

export const singleRoleErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.singleRoleError
);

export const updateSingleRoleInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateSingleRoleInfo
);

export const updateSinglRoleLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateSinglRoleLoading
);

export const updateSingleRoleErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateSingleRoleError
);
