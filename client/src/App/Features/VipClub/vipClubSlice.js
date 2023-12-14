import { createSlice } from '@reduxjs/toolkit';
import {
  getRewardList,
  getCurrencyList,
  createReward,
  editReward
} from './vipClubActions';

const INITAL_STATE = {
  rewardListInfo: null,
  rewardListLoading: false,
  rewardListError: null,

  singleRewardInfo: null,
  singleRewardLoading: false,
  singleRewardError: null,

  currencyListInfo: null,
  currencyListLoading: false,
  currencyListError: null,
}

const vipClubSlice = createSlice({
  name: 'vipClub',
  initialState: INITAL_STATE,
  reducers: {
    resetVipClub: (state) => {
      state.rewardListInfo = null;
      state.rewardListLoading = false;
      state.rewardListError = null;

      state.singleRewardInfo = null;
      state.singleRewardLoading = false;
      state.singleRewardError = null;

      state.currencyListInfo = null;
      state.currencyListLoading = false;
      state.currencyListError = null;
    },
    resetSingleReward: (state) => {
      state.singleRewardInfo = null;
      state.singleRewardLoading = false;
      state.singleRewardError = null;
    }
    // selectedGroupHandler: (state, action) => {
    //   state.selectedGroup = action.payload;
    // },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(getRewardList.pending, (state) => {
        state.rewardListInfo = null;
        state.rewardListLoading = true;
        state.rewardListError = null;
      })
      .addCase(getRewardList.rejected, (state, action) => {
        state.rewardListInfo = null;
        state.rewardListLoading = false;
        state.rewardListError = action.error.message;
      })
      .addCase(getRewardList.fulfilled, (state, action) => {
        state.rewardListInfo = action.payload?.data;
        state.rewardListLoading = false;
        state.rewardListError = null;
      });

    bulder
      .addCase(createReward.pending, (state) => {
        state.singleRewardInfo = null;
        state.singleRewardLoading = true;
        state.singleRewardError = null;
      })
      .addCase(createReward.rejected, (state, action) => {
        state.singleRewardInfo = null;
        state.singleRewardLoading = false;
        state.singleRewardError = action.error.message;
      })
      .addCase(createReward.fulfilled, (state, action) => {
        state.singleRewardInfo = action.payload?.data;
        state.singleRewardLoading = false;
        state.singleRewardError = null;
      });

    bulder
      .addCase(editReward.pending, (state) => {
        state.singleRewardInfo = null;
        state.singleRewardLoading = true;
        state.singleRewardError = null;
      })
      .addCase(editReward.rejected, (state, action) => {
        state.singleRewardInfo = null;
        state.singleRewardLoading = false;
        state.singleRewardError = action.error.message;
      })
      .addCase(editReward.fulfilled, (state, action) => {
        state.singleRewardInfo = action.payload?.data;
        state.singleRewardLoading = false;
        state.singleRewardError = null;
      });

    bulder
      .addCase(getCurrencyList.pending, (state) => {
        state.currencyListInfo = null;
        state.currencyListLoading = true;
        state.currencyListError = null;
      })
      .addCase(getCurrencyList.rejected, (state, action) => {
        state.currencyListInfo = null;
        state.currencyListLoading = false;
        state.currencyListError = action.error.message;
      })
      .addCase(getCurrencyList.fulfilled, (state, action) => {
        state.currencyListInfo = action.payload?.data;
        state.currencyListLoading = false;
        state.currencyListError = null;
      });
  },
});

export const { resetVipClub, resetSingleReward } = vipClubSlice.actions;

export default vipClubSlice.reducer;