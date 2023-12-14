import { createSlice } from '@reduxjs/toolkit';
import {
   getUserDailySpinInfo,
   getEnableDraw,
   getLuckSpinDrawInfo,
} from './LuckyDrawActions';

const INITAL_STATE = {
   userSpinInfo: null,
   getUserSpinInfoLoading: false,
   userSpinInfoError: null,
   draws: null,
   drawsLoading: false,
   drawsError: null,
   selectedDraw: null,
   luckyDrawData: null,
   luckyDrawDataLoading: false,
   luckyDrawDataError: null,
   showConPopup: false,
   luckyDrawWinData: null,
};

const luckyDrawSlice = createSlice({
   name: 'luckyDraw',
   initialState: INITAL_STATE,
   reducers: {
      selectedDrawHandler: (state, action) => {
         state.selectedDraw = action?.payload;
      },
      updateTodaySpin: (state, action) => {
         state.userSpinInfo = {
            ...state.userSpinInfo,
            response: [
               {
                  ...state?.userSpinInfo?.response?.[0],
                  todaySpin: action.payload?.todaySpin,
               },
            ],
         };
      },
      showCongiHandler: (state, action) => {
         state.showConPopup = action.payload?.show;
         state.luckyDrawWinData = action.payload?.data;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getUserDailySpinInfo.pending, (state) => {
            state.userSpinInfo = null;
            state.getUserSpinInfoLoading = true;
            state.userSpinInfoError = null;
         })
         .addCase(getUserDailySpinInfo.rejected, (state, action) => {
            state.userSpinInfo = null;
            state.getUserSpinInfoLoading = false;
            state.userSpinInfoError = action.error.message;
         })
         .addCase(getUserDailySpinInfo.fulfilled, (state, action) => {
            state.userSpinInfo = action.payload.data;
            state.getUserSpinInfoLoading = false;
            state.userSpinInfoError = null;
         });

      bulder
         .addCase(getEnableDraw.pending, (state) => {
            state.draws = null;
            state.drawsLoading = true;
            state.drawsError = null;
         })
         .addCase(getEnableDraw.rejected, (state, action) => {
            state.draws = null;
            state.drawsLoading = false;
            state.drawsError = action.error.message;
         })
         .addCase(getEnableDraw.fulfilled, (state, action) => {
            state.draws = action.payload.data;
            state.drawsLoading = false;
            state.drawsError = null;
         });

      bulder
         .addCase(getLuckSpinDrawInfo.pending, (state) => {
            state.luckyDrawData = null;
            state.luckyDrawDataLoading = true;
            state.luckyDrawDataError = null;
         })
         .addCase(getLuckSpinDrawInfo.rejected, (state, action) => {
            state.luckyDrawData = null;
            state.luckyDrawDataLoading = false;
            state.luckyDrawDataError = action.error.message;
         })
         .addCase(getLuckSpinDrawInfo.fulfilled, (state, action) => {
            state.luckyDrawData = action.payload.data;
            state.luckyDrawDataLoading = false;
            state.luckyDrawDataError = null;
         });
   },
});

export const { selectedDrawHandler, updateTodaySpin, showCongiHandler } =
   luckyDrawSlice.actions;

export default luckyDrawSlice.reducer;
