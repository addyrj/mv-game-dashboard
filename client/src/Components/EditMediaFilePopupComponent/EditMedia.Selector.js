import { createSelector } from '@reduxjs/toolkit';

const mediaReducer = (state) => state.media;

export const imageReplaceLoadingSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.imageReplaceLoading
);

export const imageReplaceErrorSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.imageReplaceError
);

export const imageReplacedInfoSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.imageReplacedInfo
);
