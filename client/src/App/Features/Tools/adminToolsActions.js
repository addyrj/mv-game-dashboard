import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

const downloadFile = function (response, fileName) {
   const blob = new Blob([response], {
      type: 'application/json',
   });
   const href = URL.createObjectURL(blob);

   // create "a" HTLM element with href to file
   const link = document.createElement('a');
   link.href = href;
   link.download = fileName + '.json';
   document.body.appendChild(link);
   link.click();

   // clean up "a" element & remove ObjectURL
   document.body.removeChild(link);
   URL.revokeObjectURL(href);
};

export const exportGameCollectionNoPopulateData = createAsyncThunk(
   'tools/exportGameCollectionData',
   async (_, { rejectWithValue }) => {
      try {
         const exportGameDataRespose = await axiosInstance.get(
            '/admin-tools/get-game-collection-no-populate-data',
            { responseType: 'arrayBuffer' }
         );

         const fileName = 'game-data';
         downloadFile(exportGameDataRespose?.data, fileName);
         return exportGameDataRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const exportGameAllData = createAsyncThunk(
   'tools/exportGameAllData',
   async (_, { rejectWithValue }) => {
      try {
         const gameDataResponse = await axiosInstance.get(
            '/admin-tools/get-game-collection-all-data',
            { responseType: 'arrayBuffer' }
         );

         const fileName = 'game-populate-data';
         downloadFile(gameDataResponse?.data, fileName);
         return gameDataResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getCollectionDataWithCategoryList = createAsyncThunk(
   'tools/getCollectionDataWithCategoryList',
   async (_, { rejectWithValue }) => {
      try {
         const gameDataResponse = await axiosInstance.get(
            '/admin-tools/get-game-category-collection-with-game-data',
            { responseType: 'arrayBuffer' }
         );

         const fileName = 'game-category-data';
         downloadFile(gameDataResponse?.data, fileName);
         return gameDataResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllProvidersData = createAsyncThunk(
   'tools/getAllProvidersData',
   async (_, { rejectWithValue }) => {
      try {
         const gameDataResponse = await axiosInstance.get(
            '/admin-tools/get-all-providers-data',
            { responseType: 'arrayBuffer' }
         );

         const fileName = 'providers-games';
         downloadFile(gameDataResponse?.data, fileName);
         return gameDataResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
