import { createSelector } from '@reduxjs/toolkit';

const mediaReducer = (state) => state.media;

export const mediaImagesSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.mediaImages
);

export const mediaImagesLoadingSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.mediaImagesLoading
);

export const mediaImagesErrorSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.mediaImagesError
);

export const uploadBulkImagesInfoSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.uploadBulkImagesInfo
);

export const uploadBulkImagesErrorSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.uploadBulkImagesError
);
