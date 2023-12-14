import { createSlice } from '@reduxjs/toolkit';
import {
   exportGameCollectionNoPopulateData,
   exportGameAllData,
   getCollectionDataWithCategoryList,
   getAllProvidersData,
} from './adminToolsActions';

const INITAL_STATE = {
   exportGameDataLoading: false,
   exportGameDataError: null,
};

const adminToolsSlice = createSlice({
   name: 'adminTools',
   initialState: INITAL_STATE,
   extraReducers: (bulder) => {
      bulder
         .addCase(exportGameCollectionNoPopulateData.pending, (state) => {
            state.exportGameDataLoading = true;
            state.exportGameDataError = null;
         })
         .addCase(
            exportGameCollectionNoPopulateData.rejected,
            (state, action) => {
               state.exportGameDataLoading = false;
               state.exportGameDataError = action.error.message;
            }
         )
         .addCase(
            exportGameCollectionNoPopulateData.fulfilled,
            (state, action) => {
               state.exportGameDataLoading = false;
               state.exportGameDataError = null;
            }
         );

      bulder
         .addCase(exportGameAllData.pending, (state) => {
            state.exportGameDataLoading = true;
            state.exportGameDataError = null;
         })
         .addCase(exportGameAllData.rejected, (state, action) => {
            state.exportGameDataLoading = false;
            state.exportGameDataError = action.error.message;
         })
         .addCase(exportGameAllData.fulfilled, (state, action) => {
            state.exportGameDataLoading = false;
            state.exportGameDataError = null;
         });

      bulder
         .addCase(getCollectionDataWithCategoryList.pending, (state) => {
            state.exportGameDataLoading = true;
            state.exportGameDataError = null;
         })
         .addCase(
            getCollectionDataWithCategoryList.rejected,
            (state, action) => {
               state.exportGameDataLoading = false;
               state.exportGameDataError = action.error.message;
            }
         )
         .addCase(
            getCollectionDataWithCategoryList.fulfilled,
            (state, action) => {
               state.exportGameDataLoading = false;
               state.exportGameDataError = null;
            }
         );

      bulder
         .addCase(getAllProvidersData.pending, (state) => {
            state.exportGameDataLoading = true;
            state.exportGameDataError = null;
         })
         .addCase(getAllProvidersData.rejected, (state, action) => {
            state.exportGameDataLoading = false;
            state.exportGameDataError = action.error.message;
         })
         .addCase(getAllProvidersData.fulfilled, (state, action) => {
            state.exportGameDataLoading = false;
            state.exportGameDataError = null;
         });
   },
});

export default adminToolsSlice.reducer;
