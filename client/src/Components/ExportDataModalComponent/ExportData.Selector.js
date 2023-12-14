import { createSelector } from '@reduxjs/toolkit';

const adminToolsReducerSelector = (state) => state.adminTools;

export const exportGameDataLoadingSelector = createSelector(
   [adminToolsReducerSelector],
   (adminToolsSlice) => adminToolsSlice.exportGameDataLoading
);

export const exportGameDataErrorSelector = createSelector(
   [adminToolsReducerSelector],
   (adminToolsSlice) => adminToolsSlice.exportGameDataError
);
