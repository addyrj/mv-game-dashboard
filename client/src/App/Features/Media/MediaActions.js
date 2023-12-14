import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const uploadBulkImages = createAsyncThunk(
   'media/uploadBulkImages',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/media/upload-bulk-images',
            data
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllUploadImages = createAsyncThunk(
   'media/getAllUploadImages',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/media/get-all-uploded-images?page=${page}`
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteMediaFiles = createAsyncThunk(
   'media/deleteMediaFiles',
   async ({ fileName }, { rejectWithValue }) => {
      try {
         const deleteResponse = await axiosInstance.delete(
            `/media/delete-media-files?fileName=${fileName}`
         );
         return deleteResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const replaceMediaImage = createAsyncThunk(
   'media/replaceMediaImage',
   async (data, { rejectWithValue }) => {
      try {
         const respose = await axiosInstance.patch(
            '/media/replace-media-image',
            data
         );
         return respose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
