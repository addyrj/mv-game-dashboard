import { createSlice } from '@reduxjs/toolkit';
import {
   getAllQueryUserLists,
   getQueryUserChats,
   getQueryUsersLists,
   updatedUserQuery,
   updateUserQueryFeedBack,
   getSupportTeamUserInfo,
   getSupportTeamApprovedUsers,
   getSupportTeamFeedbacks,
   getSupportTeamConversion,
} from './liveSupportActions';

const INITAL_STATE = {
   queryUsersList: null,
   queryUsersListLoading: false,
   queryUsersListError: null,
   queryUsersChats: null,
   queryUsersChatsLoading: false,
   queryUsersChatsError: null,
   allQueryUserLists: null,
   allQueryUserListsLoading: false,
   allQueryUserListsError: null,
   rejectUserQueryLoading: false,
   rejectUserQueryError: null,
   showReasonPopup: false,
   selectedQuery: null,
   queryFeedBackLoading: false,
   queryFeedBackError: null,
   supportTeamUserInfo: null,
   supportTeamUserInfoLoading: false,
   supportTeamUserInfoError: null,
   supportTeamApprovedUsers: null,
   supportTeamApprovedUsersLoading: false,
   supportTeamApprovedUsersError: null,
   supportTeamFeedBacks: null,
   supportTeamFeedBacksLoading: false,
   supportTeamFeedBacksError: null,
   supportTeamConversion: null,
   supportTeamConversionLoading: false,
   supportTeamConversionError: null,
};

const liveSupportSlice = createSlice({
   name: 'liveSupport',
   initialState: INITAL_STATE,
   reducers: {
      showAndHideReasonPopup: (state, action) => {
         state.showReasonPopup = action.payload;
      },
      selectedQueryHandler: (state, action) => {
         state.selectedQuery = action.payload;
      },
      storeSupportMessages: (state, action) => {
         state.queryUsersChats = {
            ...state.queryUsersChats,
            chats: {
               ...state.queryUsersChats?.chats,
               messages: state.queryUsersChats?.chats?.messages.concat(action.payload),
            },
         };
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getAllQueryUserLists.pending, (state) => {
            state.queryUsersList = null;
            state.queryUsersListLoading = true;
            state.queryUsersListError = null;
         })
         .addCase(getAllQueryUserLists.rejected, (state, action) => {
            state.queryUsersList = null;
            state.queryUsersListLoading = false;
            state.queryUsersListError = action.error.message;
         })
         .addCase(getAllQueryUserLists.fulfilled, (state, action) => {
            state.queryUsersList = action.payload.data;
            state.queryUsersListLoading = false;
            state.queryUsersListError = null;
         });

      bulder
         .addCase(getQueryUserChats.pending, (state) => {
            state.queryUsersChats = null;
            state.queryUsersChatsLoading = true;
            state.queryUsersChatsError = null;
         })
         .addCase(getQueryUserChats.rejected, (state, action) => {
            state.queryUsersChats = null;
            state.queryUsersChatsLoading = false;
            state.queryUsersChatsError = action.error.message;
         })
         .addCase(getQueryUserChats.fulfilled, (state, action) => {
            state.queryUsersChats = action.payload.data;
            state.queryUsersChatsLoading = false;
            state.queryUsersChatsError = null;
         });

      bulder
         .addCase(getQueryUsersLists.pending, (state) => {
            state.allQueryUserLists = null;
            state.allQueryUserListsLoading = true;
            state.allQueryUserListsError = null;
         })
         .addCase(getQueryUsersLists.rejected, (state, action) => {
            state.allQueryUserLists = null;
            state.allQueryUserListsLoading = false;
            state.allQueryUserListsError = action.error.message;
         })
         .addCase(getQueryUsersLists.fulfilled, (state, action) => {
            state.allQueryUserLists = action.payload.data;
            state.allQueryUserListsLoading = false;
            state.allQueryUserListsError = null;
         });

      bulder
         .addCase(getSupportTeamFeedbacks.pending, (state) => {
            state.supportTeamFeedBacks = null;
            state.supportTeamFeedBacksLoading = true;
            state.supportTeamFeedBacksError = null;
         })
         .addCase(getSupportTeamFeedbacks.rejected, (state, action) => {
            state.supportTeamFeedBacks = null;
            state.supportTeamFeedBacksLoading = false;
            state.supportTeamFeedBacksError = action.error.message;
         })
         .addCase(getSupportTeamFeedbacks.fulfilled, (state, action) => {
            state.supportTeamFeedBacks = action.payload.data;
            state.supportTeamFeedBacksLoading = false;
            state.supportTeamFeedBacksError = null;
         });

      bulder
         .addCase(updatedUserQuery.pending, (state) => {
            state.rejectUserQueryLoading = true;
            state.rejectUserQueryError = null;
         })
         .addCase(updatedUserQuery.rejected, (state, action) => {
            state.rejectUserQueryLoading = false;
            state.rejectUserQueryError = action.error.message;
         })
         .addCase(updatedUserQuery.fulfilled, (state, action) => {
            state.showReasonPopup = false;
            state.selectedQuery = null;

            const queryId = action.payload?.data?.queryId;
            const isApproved = action.payload?.data?.isApproved;

            if (!!queryId) {
               state.allQueryUserLists = {
                  ...state.allQueryUserLists,
                  items: state.allQueryUserLists?.items.map((el) =>
                     el?.user?._id === queryId
                        ? {
                             ...el,
                             [isApproved ? 'isApproved' : 'isRejected']: true,
                          }
                        : el
                  ),
               };
               state.rejectUserQueryLoading = false;
               state.rejectUserQueryError = null;
            }
         });

      bulder
         .addCase(updateUserQueryFeedBack.pending, (state) => {
            state.queryFeedBackLoading = true;
            state.queryFeedBackError = null;
         })
         .addCase(updateUserQueryFeedBack.rejected, (state, action) => {
            state.queryFeedBackLoading = false;
            state.queryFeedBackError = action.error.message;
         })
         .addCase(updateUserQueryFeedBack.fulfilled, (state, action) => {
            if (action.payload?.data && action.payload?.data?.success && action.payload?.data?.userId) {
               state.queryUsersList = {
                  ...state.queryUsersList,
                  items: state.queryUsersList?.items.filter((el) => el?.user._id !== action.payload?.data?.userId),
               };
               state.queryFeedBackLoading = false;
               state.queryFeedBackError = null;
            }
         });

      bulder
         .addCase(getSupportTeamUserInfo.pending, (state) => {
            state.supportTeamUserInfo = null;
            state.supportTeamUserInfoLoading = true;
            state.supportTeamUserInfoError = null;
         })
         .addCase(getSupportTeamUserInfo.rejected, (state, action) => {
            state.supportTeamUserInfo = null;
            state.supportTeamUserInfoLoading = false;
            state.supportTeamUserInfoError = action.error.message;
         })
         .addCase(getSupportTeamUserInfo.fulfilled, (state, action) => {
            state.supportTeamUserInfo = action.payload.data;
            state.supportTeamUserInfoLoading = false;
            state.supportTeamUserInfoError = null;
         });

      bulder
         .addCase(getSupportTeamApprovedUsers.pending, (state) => {
            state.supportTeamApprovedUsers = null;
            state.supportTeamApprovedUsersLoading = true;
            state.supportTeamApprovedUsersError = null;
         })
         .addCase(getSupportTeamApprovedUsers.rejected, (state, action) => {
            state.supportTeamApprovedUsers = null;
            state.supportTeamApprovedUsersLoading = false;
            state.supportTeamApprovedUsersError = action.error.message;
         })
         .addCase(getSupportTeamApprovedUsers.fulfilled, (state, action) => {
            state.supportTeamApprovedUsers = action.payload.data;
            state.supportTeamApprovedUsersLoading = false;
            state.supportTeamApprovedUsersError = null;
         });

      bulder
         .addCase(getSupportTeamConversion.pending, (state) => {
            state.supportTeamConversion = null;
            state.supportTeamConversionLoading = true;
            state.supportTeamConversionError = null;
         })
         .addCase(getSupportTeamConversion.rejected, (state, action) => {
            state.supportTeamConversion = null;
            state.supportTeamConversionLoading = false;
            state.supportTeamConversionError = action.error.message;
         })
         .addCase(getSupportTeamConversion.fulfilled, (state, action) => {
            state.supportTeamConversion = action.payload.data;
            state.supportTeamConversionLoading = false;
            state.supportTeamConversionError = null;
         });
   },
});

export const { showAndHideReasonPopup, selectedQueryHandler, storeSupportMessages } = liveSupportSlice.actions;

export default liveSupportSlice.reducer;
