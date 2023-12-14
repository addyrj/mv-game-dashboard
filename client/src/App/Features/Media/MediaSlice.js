import { createSlice } from '@reduxjs/toolkit';
import { uploadBulkImages, getAllUploadImages, deleteMediaFiles, replaceMediaImage } from './MediaActions';

const INITAL_STATE = {
   uploadBulkImagesInfo: null,
   uploadBulkImagesLoading: false,
   uploadBulkImagesError: null,
   mediaImages: null,
   mediaImagesLoading: false,
   mediaImagesError: null,
   deleteFileLoading: false,
   deleteFileError: null,
   imageReplacedInfo: null,
   imageReplaceLoading: false,
   imageReplaceError: false,
   pickedImage: null,
   showPickerPopUp: false,
};

const mediaSlice = createSlice({
   name: 'media',
   initialState: INITAL_STATE,
   reducers: {
      removeImagesInfo: (state, action) => {
         state.uploadBulkImagesInfo = null;
         state.uploadBulkImagesLoading = false;
         state.uploadBulkImagesError = null;
      },
      removeReplaceError: (state) => {
         state.imageReplaceError = null;
         state.imageReplacedInfo = null;
      },
      showPickerPopUpHandler: (state, action) => {
         state.showPickerPopUp = action.payload;
      },
      pickedImageHandler: (state, action) => {
         state.pickedImage = action.payload?.pickedImage;
      },
      removePickedImage: (state) => {
         state.pickedImage = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(uploadBulkImages.pending, (state, action) => {
            state.uploadBulkImagesInfo = null;
            state.uploadBulkImagesLoading = true;
            state.uploadBulkImagesError = null;
         })
         .addCase(uploadBulkImages.rejected, (state, action) => {
            state.uploadBulkImagesInfo = null;
            state.uploadBulkImagesLoading = false;
            state.uploadBulkImagesError = action.error?.message;
         })
         .addCase(uploadBulkImages.fulfilled, (state, action) => {
            state.mediaImages = {
               ...state.mediaImages,
               images: [...action.payload?.data?.images, ...state.mediaImages.images],
            };
            state.uploadBulkImagesInfo = action.payload?.data;
            state.uploadBulkImagesLoading = false;
            state.uploadBulkImagesError = null;
         });

      bulder
         .addCase(getAllUploadImages.pending, (state, action) => {
            state.mediaImages = null;
            state.mediaImagesLoading = true;
            state.mediaImagesError = null;
         })
         .addCase(getAllUploadImages.rejected, (state, action) => {
            state.mediaImages = null;
            state.mediaImagesLoading = false;
            state.mediaImagesError = action.error?.message;
         })
         .addCase(getAllUploadImages.fulfilled, (state, action) => {
            state.mediaImages = action.payload?.data;
            state.mediaImagesLoading = false;
            state.mediaImagesError = null;
         });

      bulder
         .addCase(deleteMediaFiles.pending, (state, action) => {
            state.deleteFileLoading = true;
            state.deleteFileError = null;
         })
         .addCase(deleteMediaFiles.rejected, (state, action) => {
            state.deleteFileLoading = false;
            state.deleteFileError = action.error?.message;
         })
         .addCase(deleteMediaFiles.fulfilled, (state, action) => {
            state.mediaImages = {
               ...state.mediaImages,
               images: state.mediaImages?.images.filter((el) => el?.key !== action.payload?.data?.deleteObject),
            };
            state.deleteFileLoading = false;
            state.deleteFileError = null;
         });

      bulder
         .addCase(replaceMediaImage.pending, (state, action) => {
            state.imageReplaceLoading = true;
            state.imageReplaceError = null;
         })
         .addCase(replaceMediaImage.rejected, (state, action) => {
            state.imageReplaceLoading = false;
            state.imageReplaceError = action.error?.message;
         })
         .addCase(replaceMediaImage.fulfilled, (state, action) => {
            state.mediaImages = {
               ...state.mediaImages,
               images: state.mediaImages?.images.map((el) =>
                  el?.key === action.payload?.data?.key
                     ? {
                          key: action.payload?.data?.key + '?' + new Date().getTime(),
                          edit: true,
                       }
                     : el
               ),
            };
            state.imageReplacedInfo = action.payload?.data?.message;
            state.imageReplaceLoading = false;
            state.imageReplaceError = null;
         });
   },
});

export const { removeImagesInfo, removeReplaceError, pickedImageHandler, showPickerPopUpHandler, removePickedImage } =
   mediaSlice.actions;

export default mediaSlice.reducer;
