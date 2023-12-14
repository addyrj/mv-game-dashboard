import { createSelector } from '@reduxjs/toolkit';

const clientReducerSelector = (state) => state.client;

export const userInfoSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.userInfo
);

export const allMadelsSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.allMadels
);

export const allMadelsLoadingSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.allMadelsLoading
);

export const allMadelsFetchErrorSelector = createSelector(
   [clientReducerSelector],
   (clientSlice) => clientSlice.allMadelsFetchError
);
