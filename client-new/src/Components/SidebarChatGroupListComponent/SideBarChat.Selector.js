import { createSelector } from '@reduxjs/toolkit';

const groupReducerSelector = (state) => state.group;

export const groupsSelector = createSelector(
   [groupReducerSelector],
   (groupSlice) => groupSlice.groups
);

export const fetchGroupsLoadingSelector = createSelector(
   [groupReducerSelector],
   (groupSlice) => groupSlice.fetchGroupsLoading
);

export const fetchGroupsErrorSelector = createSelector(
   [groupReducerSelector],
   (groupSlice) => groupSlice.fetchGroupsError
);
