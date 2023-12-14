import { createSelector } from '@reduxjs/toolkit';

const mediaReducer = (state) => state.media;

export const uploadBulkImagesInfoSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.uploadBulkImagesInfo
);

export const uploadBulkImagesLoadingSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.uploadBulkImagesLoading
);

export const uploadBulkImagesErrorSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.uploadBulkImagesError
);
