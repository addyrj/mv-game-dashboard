import { createSlice } from '@reduxjs/toolkit';
import {
   getUserInformation,
   getSelectedUserInfo,
   updateUserNameHander,
   updateAvatarHandler,
   getPrivacyFieldStatus,
   getAllMadels,
   getFriendRequestList,
   getFriendList,
   getPrivateMessages,
   getUsersAvatars,
   getAllGames,
   getSingleGameInfo,
   getCommingSoonGames,
   FavoriteGameHandler,
   GameLikeHandler,
   getAllCategory,
   getGamesEnableCategory,
   getUserSelectedCurrency,
   setUserSelectedCurrency,
   profilePrivacyHandler,
} from './clientActions';

const INITAL_STATE = {
   userInfo: null,
   fetchUserInfoLoading: false,
   fetchUserInfoError: null,
   showSidebarChat: false,
   showSidebarNotifications: false,
   updateUserName: null,
   updateUserNameLoading: false,
   fetchUpdateUserNameError: null,
   updateUserNameInvalidErrors: null,
   updateAvatar: null,
   updateAvatarLoading: false,
   updateAvatarFetchError: null,
   allMadels: null,
   allMadelsLoading: false,
   allMadelsFetchError: null,
   friendRequestLoading: false,
   userProfilePrivacyInfo: null,
   userProfilePrivacyInfoLoading: false,
   userProfilePrivacyInfoFetchError: null,
   friendRequestList: null,
   friendRequestListLoading: false,
   friendRequestListFetchError: null,
   friends: null,
   getFriendListLoading: false,
   getFriendListFetchError: null,
   privateChat: null,
   privateChatLoading: false,
   privateChatFetchError: null,
   showUserInbox: false,
   globalChatMessagesSeen: [],
   showDailySpinPopUp: false,
   userAvatars: null,
   userAvatarsLoading: false,
   userAvatarsError: null,
   allGamesList: null,
   allGamesListLoading: false,
   allGamesListError: null,
   singleGame: null,
   singleGameLoading: false,
   singleGameError: null,
   commingSoonGames: null,
   commingSoonGamesLoading: false,
   commingSoonGamesError: null,
   FavoriteGameInfo: null,
   FavoriteGameLoading: false,
   FavoriteGameError: null,
   LikeGameInfo: null,
   LikeGameLoading: false,
   LikeGameError: null,
   showAndHideSmSidebar: false,
   showSearchListCm: false,
   allCategory: null,
   allCategoryLoading: false,
   allCategoryError: null,
   toggleUserProfileInfo: false,
   toggleUserWalletInfo: false,
   InsufficientBlanceAlert: false,
   screenZoomLevel: null,
   gamesEnableCategory: null,
   gamesEnableCategoryLoading: false,
   gamesEnableCategoryError: null,
   selectedCurrency: null,
   selectedCurrencyLoading: false,
   selectedCurrencyError: null,
   showSwapPopup: false,
   privacyFiledUpdateInfo: null,
   privacyFiledUpdateLoading: false,
   privacyFiledUpdateError: null,
};

const insertNewFriendRequest = function (state, payload) {
   state.unshift({
      userId: payload?.user,
      avatar: payload?.avatar,
      name: payload?.name,
      _id: payload?._id,
      status: payload?.status,
   });
   return state;
};

const clientSlice = createSlice({
   name: 'client',
   initialState: INITAL_STATE,
   reducers: {
      removeUserInfromation: (state) => {
         state.userInfo = null;
      },
      showSidebarHandler: (state, action) => {
         state.showSidebarChat = action.payload?.data;
         state.showSidebarNotifications = false;
      },
      showNotificationHandler: (state, action) => {
         state.showSidebarChat = false;
         state.showSidebarNotifications = action.payload.data;
      },
      removeInvalidErrors: (state) => {
         state.updateUserNameInvalidErrors = null;
      },
      addRequestLoadingHandler: (state, action) => {
         state.friendRequestLoading = action.payload.data;
      },
      inserUserRequestHandler: (state, action) => {
         state.userInfo = {
            ...state.userInfo,
            user: {
               ...state.userInfo.user,
               requests: [{ ...action.payload.data }],
            },
         };
      },
      rejectRequestUser: (state, action) => {
         const friendRequestList = state.friendRequestList?.response?.[0];

         if (friendRequestList?.friendRequests.length) {
            state.friendRequestList = {
               ...state.friendRequestList,
               response: [
                  {
                     ...state.friendRequestList?.response,
                     friendRequests: friendRequestList.friendRequests.filter(
                        (el) => el._id !== action.payload.rejectedUserId
                     ),
                  },
               ],
            };
         }
      },
      rejectRequestSenderHandler: (state, action) => {
         state.userInfo = {
            ...state.userInfo,
            user: {
               ...state.userInfo?.user,
               requests: state.userInfo?.user?.requests.filter(
                  (el) => el.friendRequestUser !== action.payload.id
               ),
            },
         };
      },
      acceptedFriendReqeustHandler: (state, action) => {
         state.friendRequestList = {
            ...state.friendRequestList,
            response: [
               {
                  ...state.friendRequestList?.response,
                  friendRequests:
                     state.friendRequestList.response[0].friendRequests.map(
                        (el) =>
                           el._id === action.payload.acceptedUserId
                              ? { ...el, status: action.payload.status }
                              : el
                     ),
               },
            ],
         };
      },
      acceptedFriendSenderHandler: (state, action) => {
         state.userInfo = {
            ...state.userInfo,
            user: {
               ...state.userInfo?.user,
               requests: [],
               isFriend: [
                  {
                     userId: action.payload.id,
                  },
               ],
            },
         };
      },
      blockedFriendRequestHandler: (state, action) => {
         state.friendRequestList = {
            ...state.friendRequestList,
            response: [
               {
                  ...state.friendRequestList?.response,
                  friendRequests:
                     state.friendRequestList.response[0].friendRequests.filter(
                        (el) => el._id !== action.payload.blockedUserId
                     ),
               },
            ],
         };
      },
      blockedFriendRequesteSenderHandler: (state, action) => {
         state.userInfo = {
            ...state.userInfo,
            user: {
               ...state.userInfo?.user,
               requests: [],
               isBlocked: [
                  {
                     userId: action.payload.id,
                  },
               ],
            },
         };
      },
      removePrivetChatMsgHandler: (state) => {
         state.privateChat = null;
      },
      showUserInboxHandler: (state, action) => {
         state.showUserInbox = action.payload.data;
      },
      removeSeenGlobalMsg: (state, action) => {
         state.globalChatMessagesSeen = [];
      },
      gobalChatMsgSeenHandler: (state, action) => {
         if (!state.showSidebarChat) {
            state.globalChatMessagesSeen = [
               ...state.globalChatMessagesSeen,
               action.payload.data,
            ];
         }
      },
      showDailySpinPopUpHandler: (state, action) => {
         state.showDailySpinPopUp = action.payload.data;
      },
      removeGameInfo: (state) => {
         state.FavoriteGameInfo = null;
         state.FavoriteGameError = null;
         state.LikeGameInfo = null;
         state.LikeGameError = null;
      },
      showAndHideSideBarHandler: (state, action) => {
         state.showAndHideSmSidebar = action.payload;
      },
      showSearchListCmHandler: (state, action) => {
         state.showSearchListCm = action.payload;
      },
      toggleProfileInfoHandler: (state, action) => {
         state.toggleUserProfileInfo = action.payload;
      },
      toggleUserWalletHandler: (state, action) => {
         state.toggleUserWalletInfo = action.payload;
      },
      showAndHideInsufficientBlcHandler: (state, action) => {
         state.InsufficientBlanceAlert = action.payload;
      },
      newFrinedRequest: (state, action) => {
         const friendRequestList = state.friendRequestList?.response?.[0];

         if (friendRequestList) {
            state.friendRequestList = {
               ...state.friendRequestList,
               response: [
                  {
                     ...friendRequestList?._id,
                     friendRequests: insertNewFriendRequest(
                        friendRequestList?.friendRequests,
                        action.payload
                     ),
                  },
               ],
            };
         } else {
            state.friendRequestList = {
               ...state.friendRequestList,
               response: [
                  {
                     friendRequests: [action.payload],
                  },
               ],
            };
         }
      },
      addNewFriend: (state, action) => {
         const userFriends = state.friends?.response?.[0];

         if (userFriends) {
            state.friends = {
               ...state.friends,
               response: [
                  {
                     ...userFriends?._id,
                     friends: [action.payload, ...userFriends?.friends],
                  },
               ],
            };
         } else {
            state.friends = {
               ...state.friends,
               response: [
                  {
                     ...userFriends?._id,
                     friends: [action.payload],
                  },
               ],
            };
         }
      },
      removeUserPrivacyInfo: (state) => {
         state.userProfilePrivacyInfo = null;
         state.userProfilePrivacyInfoFetchError = null;
      },
      setScreenScreenZoomLevel: (state, action) => {
         state.screenZoomLevel = action.payload?.zoom;
      },
      updateUserPrivacy: (state, action) => {
         state.userProfilePrivacyInfo = {
            ...state.userProfilePrivacyInfo,
            response: {
               ...state.userProfilePrivacyInfo?.response,
               ...action.payload?.data,
            },
         };
      },
      updateUserProfilePrivacyInfo: (state, action) => {
         const user = state?.userInfo?.user;

         if (!!user && user?._id && user?._id === action.payload?.userId) {
            state.userInfo = {
               ...state.userInfo,
               user: {
                  ...user,
                  [action.payload?.field]: action.payload?.value,
               },
            };
         }
      },
      showAndHideSwapPopupHandler: (state, action) => {
         state.showSwapPopup = action.payload;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getUserInformation.pending, (state) => {
            state.userInfo = null;
            state.fetchUserInfoLoading = true;
            state.fetchUserInfoError = null;
         })
         .addCase(getUserInformation.rejected, (state, action) => {
            state.userInfo = null;
            state.fetchUserInfoLoading = false;
            state.fetchUserInfoError = action.error.message;
         })
         .addCase(getUserInformation.fulfilled, (state, action) => {
            state.userInfo = action.payload.data;
            state.fetchUserInfoLoading = false;
            state.fetchUserInfoError = null;
         });

      bulder
         .addCase(getSelectedUserInfo.pending, (state) => {
            state.userInfo = null;
            state.fetchUserInfoLoading = true;
            state.fetchUserInfoError = null;
         })
         .addCase(getSelectedUserInfo.rejected, (state, action) => {
            state.userInfo = null;
            state.fetchUserInfoLoading = false;
            state.fetchUserInfoError = action.error.message;
         })
         .addCase(getSelectedUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload.data;
            state.fetchUserInfoLoading = false;
            state.fetchUserInfoError = null;
         });

      bulder
         .addCase(updateUserNameHander.pending, (state) => {
            state.updateUserName = null;
            state.updateUserNameLoading = true;
            state.fetchUpdateUserNameError = null;
         })
         .addCase(updateUserNameHander.rejected, (state, action) => {
            state.updateUserName = null;
            state.updateUserNameLoading = false;
            state.fetchUpdateUserNameError = action.error.message;
         })
         .addCase(updateUserNameHander.fulfilled, (state, action) => {
            if (action.payload.status === 422) {
               state.updateUserNameLoading = false;
               state.fetchUpdateUserNameError = null;
               state.updateUserNameInvalidErrors = action.payload?.data;
            } else {
               state.userInfo = action?.payload?.data?.success
                  ? {
                       ...state.userInfo,
                       user: {
                          ...state?.userInfo?.user,
                          name: action.payload?.data?.userName,
                       },
                    }
                  : state.userInfo;
               state.updateUserName = action.payload.data;
               state.updateUserNameLoading = false;
               state.fetchUpdateUserNameError = null;
            }
         });

      bulder
         .addCase(updateAvatarHandler.pending, (state) => {
            state.updateAvatar = null;
            state.updateAvatarLoading = true;
            state.updateAvatarFetchError = null;
         })
         .addCase(updateAvatarHandler.rejected, (state, action) => {
            state.updateAvatar = null;
            state.updateAvatarLoading = false;
            state.updateAvatarFetchError = action.error.message;
         })
         .addCase(updateAvatarHandler.fulfilled, (state, action) => {
            state.userInfo = action?.payload?.data?.success
               ? {
                    ...state.userInfo,
                    user: {
                       ...state?.userInfo?.user,
                       avatar: action.payload?.data?.avatar,
                    },
                 }
               : state.userInfo;
            state.updateAvatar = action.payload.data;
            state.updateAvatarLoading = false;
            state.updateAvatarFetchError = null;
         });

      bulder
         .addCase(getAllMadels.pending, (state) => {
            state.allMadels = null;
            state.allMadelsLoading = true;
            state.allMadelsFetchError = null;
         })
         .addCase(getAllMadels, (state, action) => {
            state.allMadels = null;
            state.allMadelsLoading = false;
            state.allMadelsFetchError = action.error.message;
         })
         .addCase(getAllMadels.fulfilled, (state, action) => {
            state.allMadels = action.payload?.data;
            state.allMadelsLoading = false;
            state.allMadelsFetchError = null;
         });

      bulder
         .addCase(getPrivacyFieldStatus.pending, (state) => {
            state.userProfilePrivacyInfo = null;
            state.userProfilePrivacyInfoLoading = true;
            state.userProfilePrivacyInfoFetchError = null;
         })
         .addCase(getPrivacyFieldStatus.rejected, (state, action) => {
            state.userProfilePrivacyInfo = null;
            state.userProfilePrivacyInfoLoading = false;
            state.userProfilePrivacyInfoFetchError = action.error.message;
         })
         .addCase(getPrivacyFieldStatus.fulfilled, (state, action) => {
            state.userProfilePrivacyInfo = action.payload.data;
            state.userProfilePrivacyInfoLoading = false;
            state.userProfilePrivacyInfoFetchError = null;
         });

      bulder
         .addCase(getFriendRequestList.pending, (state) => {
            state.friendRequestList = null;
            state.friendRequestListLoading = true;
            state.friendRequestListFetchError = null;
         })
         .addCase(getFriendRequestList.rejected, (state, action) => {
            state.friendRequestList = null;
            state.friendRequestListLoading = false;
            state.friendRequestListFetchError = action.error.message;
         })
         .addCase(getFriendRequestList.fulfilled, (state, action) => {
            state.friendRequestList = action.payload.data;
            state.friendRequestListLoading = false;
            state.friendRequestListFetchError = null;
         });

      bulder
         .addCase(getFriendList.pending, (state) => {
            state.friends = null;
            state.getFriendListLoading = true;
            state.getFriendListFetchError = null;
         })
         .addCase(getFriendList.rejected, (state, action) => {
            state.friends = null;
            state.getFriendListLoading = false;
            state.getFriendListFetchError = action.error.message;
         })
         .addCase(getFriendList.fulfilled, (state, action) => {
            state.friends = action.payload.data;
            state.getFriendListLoading = false;
            state.getFriendListFetchError = null;
         });

      bulder
         .addCase(getPrivateMessages.pending, (state) => {
            state.privateChat = null;
            state.privateChatLoading = true;
            state.privateChatFetchError = null;
         })
         .addCase(getPrivateMessages.rejected, (state, action) => {
            state.privateChat = null;
            state.privateChatLoading = false;
            state.privateChatFetchError = action.error.message;
         })
         .addCase(getPrivateMessages.fulfilled, (state, action) => {
            state.privateChat = action.payload.data;
            state.privateChatLoading = false;
            state.privateChatFetchError = null;
         });

      bulder
         .addCase(getUsersAvatars.pending, (state) => {
            state.userAvatars = null;
            state.userAvatarsLoading = true;
            state.userAvatarsError = null;
         })
         .addCase(getUsersAvatars.rejected, (state, action) => {
            state.userAvatars = null;
            state.userAvatarsLoading = false;
            state.userAvatarsError = action.error.message;
         })
         .addCase(getUsersAvatars.fulfilled, (state, action) => {
            state.userAvatars = action.payload.data;
            state.userAvatarsLoading = false;
            state.userAvatarsError = null;
         });

      bulder
         .addCase(getAllGames.pending, (state) => {
            state.allGamesList = null;
            state.allGamesListLoading = true;
            state.allGamesListError = null;
         })
         .addCase(getAllGames.rejected, (state, action) => {
            state.allGamesList = null;
            state.allGamesListLoading = false;
            state.allGamesListError = action.error.message;
         })
         .addCase(getAllGames.fulfilled, (state, action) => {
            state.allGamesList = action.payload.data;
            state.allGamesListLoading = false;
            state.allGamesListError = null;
         });

      bulder
         .addCase(getSingleGameInfo.pending, (state) => {
            state.singleGame = null;
            state.singleGameLoading = true;
            state.singleGameError = null;
         })
         .addCase(getSingleGameInfo.rejected, (state, action) => {
            state.singleGame = null;
            state.singleGameLoading = false;
            state.singleGameError = action.error.message;
         })
         .addCase(getSingleGameInfo.fulfilled, (state, action) => {
            state.singleGame = action.payload.data;
            state.singleGameLoading = false;
            state.singleGameError = null;
         });

      bulder
         .addCase(getCommingSoonGames.pending, (state) => {
            state.commingSoonGames = null;
            state.commingSoonGamesLoading = true;
            state.commingSoonGamesError = null;
         })
         .addCase(getCommingSoonGames.rejected, (state, action) => {
            state.commingSoonGames = null;
            state.commingSoonGamesLoading = false;
            state.commingSoonGamesError = action.error.message;
         })
         .addCase(getCommingSoonGames.fulfilled, (state, action) => {
            state.commingSoonGames = action.payload.data;
            state.commingSoonGamesLoading = false;
            state.commingSoonGamesError = null;
         });

      bulder
         .addCase(FavoriteGameHandler.pending, (state) => {
            state.FavoriteGameInfo = null;
            state.FavoriteGameLoading = true;
            state.FavoriteGameError = null;
         })
         .addCase(FavoriteGameHandler.rejected, (state, action) => {
            state.FavoriteGameInfo = null;
            state.FavoriteGameLoading = false;
            state.FavoriteGameError = action.error.message;
         })
         .addCase(FavoriteGameHandler.fulfilled, (state, action) => {
            state.FavoriteGameInfo = action.payload.data;
            state.FavoriteGameLoading = false;
            state.FavoriteGameError = null;
         });

      bulder
         .addCase(GameLikeHandler.pending, (state) => {
            state.LikeGameInfo = null;
            state.LikeGameLoading = true;
            state.LikeGameError = null;
         })
         .addCase(GameLikeHandler.rejected, (state, action) => {
            state.LikeGameInfo = null;
            state.LikeGameLoading = false;
            state.LikeGameError = action.error.message;
         })
         .addCase(GameLikeHandler.fulfilled, (state, action) => {
            state.LikeGameInfo = action.payload.data;
            state.LikeGameLoading = false;
            state.LikeGameError = null;
         });

      bulder
         .addCase(getAllCategory.pending, (state) => {
            state.allCategory = null;
            state.allCategoryLoading = true;
            state.allCategoryError = null;
         })
         .addCase(getAllCategory.rejected, (state, action) => {
            state.allCategory = null;
            state.allCategoryLoading = false;
            state.allCategoryError = action.error.message;
         })
         .addCase(getAllCategory.fulfilled, (state, action) => {
            state.allCategory = action.payload.data;
            state.allCategoryLoading = false;
            state.allCategoryError = null;
         });

      bulder
         .addCase(getGamesEnableCategory.pending, (state) => {
            state.gamesEnableCategory = null;
            state.gamesEnableCategoryLoading = true;
            state.gamesEnableCategoryError = null;
         })
         .addCase(getGamesEnableCategory.rejected, (state, action) => {
            state.gamesEnableCategory = null;
            state.gamesEnableCategoryLoading = false;
            state.gamesEnableCategoryError = action.error.message;
         })
         .addCase(getGamesEnableCategory.fulfilled, (state, action) => {
            state.gamesEnableCategory = action.payload.data;
            state.gamesEnableCategoryLoading = false;
            state.gamesEnableCategoryError = null;
         });

      bulder
         .addCase(getUserSelectedCurrency.pending, (state) => {
            state.selectedCurrency = null;
            state.selectedCurrencyLoading = true;
            state.selectedCurrencyError = null;
         })
         .addCase(getUserSelectedCurrency.rejected, (state, action) => {
            state.selectedCurrency = null;
            state.selectedCurrencyLoading = false;
            state.selectedCurrencyError = action.error.message;
         })
         .addCase(getUserSelectedCurrency.fulfilled, (state, action) => {
            state.selectedCurrency = action.payload.data;
            state.selectedCurrencyLoading = false;
            state.selectedCurrencyError = null;
         });

      bulder
         .addCase(setUserSelectedCurrency.pending, (state) => {
            // state.selectedCurrency = null;
            // state.selectedCurrencyLoading = true;
            state.selectedCurrencyError = null;
         })
         .addCase(setUserSelectedCurrency.rejected, (state, action) => {
            // state.selectedCurrency = null;
            // state.selectedCurrencyLoading = false;
            state.selectedCurrencyError = action.error.message;
         })
         .addCase(setUserSelectedCurrency.fulfilled, (state, action) => {
            state.selectedCurrency = {
               ...state.selectedCurrency,
               currency: {
                  ...action.payload.data?.data,
               },
            };
            state.selectedCurrencyLoading = false;
            state.selectedCurrencyError = null;
         });

      bulder
         .addCase(profilePrivacyHandler.pending, (state) => {
            state.privacyFiledUpdateInfo = null;
            state.privacyFiledUpdateLoading = true;
            state.privacyFiledUpdateError = null;
         })
         .addCase(profilePrivacyHandler.rejected, (state, action) => {
            state.privacyFiledUpdateInfo = null;
            state.privacyFiledUpdateLoading = false;
            state.privacyFiledUpdateError = action.error.message;
         })
         .addCase(profilePrivacyHandler.fulfilled, (state, action) => {
            const { data } = action.payload;

            if (!!data && data?.success) {
               if (data?.field === 'conversionCurrency') {
                  state.userProfilePrivacyInfo = {
                     ...state.userProfilePrivacyInfo,
                     response: {
                        ...state.userProfilePrivacyInfo?.response,
                        conversionCurrency: data?.value,
                     },
                  };
               }

               state.privacyFiledUpdateInfo = action.payload.data;
               state.privacyFiledUpdateLoading = false;
               state.privacyFiledUpdateError = null;
            }
         });
   },
});

export const {
   removeUserInfromation,
   showSidebarHandler,
   removeInvalidErrors,
   addRequestLoadingHandler,
   inserUserRequestHandler,
   showNotificationHandler,
   rejectRequestUser,
   rejectRequestSenderHandler,
   acceptedFriendReqeustHandler,
   acceptedFriendSenderHandler,
   blockedFriendRequestHandler,
   blockedFriendRequesteSenderHandler,
   removePrivetChatMsgHandler,
   showUserInboxHandler,
   gobalChatMsgSeenHandler,
   removeSeenGlobalMsg,
   showDailySpinPopUpHandler,
   removeGameInfo,
   showAndHideSideBarHandler,
   showSearchListCmHandler,
   toggleProfileInfoHandler,
   toggleUserWalletHandler,
   showAndHideInsufficientBlcHandler,
   newFrinedRequest,
   addNewFriend,
   removeUserPrivacyInfo,
   setScreenScreenZoomLevel,
   updateUserPrivacy,
   updateUserProfilePrivacyInfo,
   showAndHideSwapPopupHandler,
} = clientSlice.actions;

export default clientSlice.reducer;
