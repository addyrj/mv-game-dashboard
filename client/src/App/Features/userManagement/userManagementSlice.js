import { createSlice } from '@reduxjs/toolkit';
import {
   createPlayerAccount,
   getUserSingleAccount,
   setPlayerAccountPassword,
   updatePlayerAccount,
   getUserSingleAccountInformation,
   getUserAllFiatCurrency,
   getUserFiatWithdrawTransactions,
   getUserSelectedCurrency,
   getUserFiatTransaction,
   getUserCryptoWithdrawTransactions,
   getUserCryptoDepositTransactions,
   getUserAllCryptoCurrency,
   getPrivacyFieldStatus,
   getAllGlobalChatGroups,
   getUserGlobalChats,
   getUserFriendList,
   getUserWageredAmountGraph,
   getUserRoleLists,
   getUserByRoles,
} from './userManagementActions';

const INITAL_STATE = {
   createPlayerAccountInfo: null,
   createPlayerAccountLoading: false,
   createPlayerAccountError: null,
   createPlayerAccountInvalidErrors: null,
   singleUserAccountInfo: null,
   singleUserAccountLoading: false,
   singleUserAccountError: null,
   accountPasswordChangeLoading: false,
   accountPasswordChangeError: null,
   userAccountInformation: null,
   userAccountInformationLoading: false,
   userAccountInformationError: null,
   walletFiatCurrencyData: null,
   walletFiatCurrencyDataLoading: false,
   walletFiatCurrencyDataError: null,
   withdrawTransactionInfo: null,
   withdrawTransactionLoading: false,
   withdrawTransactionError: null,
   selectedCurrency: null,
   selectedCurrencyLoading: false,
   selectedCurrencyError: null,
   depositTransactions: null,
   depositTransactionsLoading: false,
   depositTransactionsError: null,
   userCryptoCurrencyList: null,
   userCryptoCurrencyListLoading: false,
   userCryptoCurrencyListError: null,
   userProfilePrivacyInfo: null,
   userProfilePrivacyInfoLoading: false,
   userProfilePrivacyInfoFetchError: null,
   allGlobalChatGroups: null,
   allGlobalChatGroupsLoading: false,
   allGlobalChatGroupsError: null,
   groupChats: null,
   groupChatsLoading: false,
   groupChatsError: null,
   loadMoreChatMessages: false,
   userFriendsList: null,
   userFriendsFetchLoading: false,
   userFriendsFetchError: null,
   selectedGroup: null,
   userWageredAmount: null,
   userWageredAmountLoading: false,
   userWageredAmountError: null,
   userRolesList: null,
   userRolesListLoading: false,
   userRolesListError: null,
   supportTeamUsers: null,
   supportTeamUsersLoading: false,
   supportTeamUsersError: null,
};

const userManagementSlice = createSlice({
   name: 'userManagement',
   initialState: INITAL_STATE,
   reducers: {
      removeAccountErrors: (state) => {
         state.createPlayerAccountError = null;
         state.createPlayerAccountInvalidErrors = null;
         state.createPlayerAccountInfo = null;
         state.singleUserAccountInfo = null;
         state.singleUserAccountLoading = false;
         state.singleUserAccountError = null;
      },
      removeGroupMessage: (state) => {
         state.groupChats = null;
      },
      selectedGroupHandler: (state, action) => {
         state.selectedGroup = action.payload;
      },
      removeUserWalletInfo: (state) => {
         state.userCryptoCurrencyList = null;
         state.walletFiatCurrencyData = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(createPlayerAccount.pending, (state) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = true;
            state.createPlayerAccountError = null;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(createPlayerAccount.rejected, (state, action) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = false;
            state.createPlayerAccountError = action.error.message;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(createPlayerAccount.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.createPlayerAccountInfo = null;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = action.payload?.data;
            } else {
               state.createPlayerAccountInfo = action.payload?.data;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = null;
            }
         });

      bulder
         .addCase(updatePlayerAccount.pending, (state) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = true;
            state.createPlayerAccountError = null;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(updatePlayerAccount.rejected, (state, action) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = false;
            state.createPlayerAccountError = action.error.message;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(updatePlayerAccount.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.createPlayerAccountInfo = null;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = action.payload?.data;
            } else {
               state.createPlayerAccountInfo = action.payload?.data;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = null;
            }
         });

      bulder
         .addCase(getUserSingleAccount.pending, (state) => {
            state.singleUserAccountInfo = null;
            state.singleUserAccountLoading = true;
            state.singleUserAccountError = null;
         })
         .addCase(getUserSingleAccount.rejected, (state, action) => {
            state.singleUserAccountInfo = null;
            state.singleUserAccountLoading = false;
            state.singleUserAccountError = action.error?.message;
         })
         .addCase(getUserSingleAccount.fulfilled, (state, action) => {
            state.singleUserAccountInfo = action.payload?.data;
            state.singleUserAccountLoading = false;
            state.singleUserAccountError = null;
         });

      bulder
         .addCase(getUserSingleAccountInformation.pending, (state) => {
            state.userAccountInformation = null;
            state.userAccountInformationLoading = true;
            state.userAccountInformationError = null;
         })
         .addCase(getUserSingleAccountInformation.rejected, (state, action) => {
            state.userAccountInformation = null;
            state.userAccountInformationLoading = false;
            state.userAccountInformationError = action.error?.message;
         })
         .addCase(getUserSingleAccountInformation.fulfilled, (state, action) => {
            state.userAccountInformation = action.payload?.data;
            state.userAccountInformationLoading = false;
            state.userAccountInformationError = null;
         });

      bulder
         .addCase(setPlayerAccountPassword.pending, (state) => {
            state.accountPasswordChangeLoading = true;
            state.accountPasswordChangeError = null;
         })
         .addCase(setPlayerAccountPassword.rejected, (state, action) => {
            state.accountPasswordChangeLoading = false;
            state.accountPasswordChangeError = action.error?.message;
         })
         .addCase(setPlayerAccountPassword.fulfilled, (state, action) => {
            state.accountPasswordChangeLoading = false;
            state.accountPasswordChangeError = null;
         });

      bulder
         .addCase(getUserAllFiatCurrency.pending, (state) => {
            state.walletFiatCurrencyData = null;
            state.walletFiatCurrencyDataLoading = true;
            state.walletFiatCurrencyDataError = null;
         })
         .addCase(getUserAllFiatCurrency.rejected, (state, action) => {
            state.walletFiatCurrencyData = null;
            state.walletFiatCurrencyDataLoading = false;
            state.walletFiatCurrencyDataError = action?.error?.message;
         })
         .addCase(getUserAllFiatCurrency.fulfilled, (state, action) => {
            state.walletFiatCurrencyData = action.payload?.data;
            state.walletFiatCurrencyDataLoading = false;
            state.walletFiatCurrencyDataError = null;
         });

      bulder
         .addCase(getUserFiatWithdrawTransactions.pending, (state) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = true;
            state.withdrawTransactionError = null;
         })
         .addCase(getUserFiatWithdrawTransactions.rejected, (state, action) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = action.error?.message;
         })
         .addCase(getUserFiatWithdrawTransactions.fulfilled, (state, action) => {
            state.withdrawTransactionInfo = action.payload?.data;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = null;
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
         .addCase(getUserFiatTransaction.pending, (state) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = true;
            state.depositTransactionsError = null;
         })
         .addCase(getUserFiatTransaction.rejected, (state, action) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = action.error?.message;
         })
         .addCase(getUserFiatTransaction.fulfilled, (state, action) => {
            state.depositTransactions = action.payload?.data;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = null;
         });

      bulder
         .addCase(getUserCryptoWithdrawTransactions.pending, (state) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = true;
            state.withdrawTransactionError = null;
         })
         .addCase(getUserCryptoWithdrawTransactions.rejected, (state, action) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = action.error?.message;
         })
         .addCase(getUserCryptoWithdrawTransactions.fulfilled, (state, action) => {
            state.withdrawTransactionInfo = action.payload?.data;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = null;
         });

      bulder
         .addCase(getUserCryptoDepositTransactions.pending, (state) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = true;
            state.depositTransactionsError = null;
         })
         .addCase(getUserCryptoDepositTransactions.rejected, (state, action) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = action.error?.message;
         })
         .addCase(getUserCryptoDepositTransactions.fulfilled, (state, action) => {
            state.depositTransactions = action.payload?.data;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = null;
         });

      bulder
         .addCase(getUserAllCryptoCurrency.pending, (state) => {
            state.userCryptoCurrencyList = null;
            state.userCryptoCurrencyListLoading = true;
            state.userCryptoCurrencyListError = null;
         })
         .addCase(getUserAllCryptoCurrency.rejected, (state, action) => {
            state.userCryptoCurrencyList = null;
            state.userCryptoCurrencyListLoading = false;
            state.userCryptoCurrencyListError = action?.error?.message;
         })
         .addCase(getUserAllCryptoCurrency.fulfilled, (state, action) => {
            state.userCryptoCurrencyList = action.payload?.data;
            state.userCryptoCurrencyListLoading = false;
            state.userCryptoCurrencyListError = null;
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
         .addCase(getAllGlobalChatGroups.pending, (state) => {
            state.allGlobalChatGroups = null;
            state.allGlobalChatGroupsLoading = true;
            state.allGlobalChatGroupsError = null;
         })
         .addCase(getAllGlobalChatGroups.rejected, (state, action) => {
            state.allGlobalChatGroups = null;
            state.allGlobalChatGroupsLoading = false;
            state.allGlobalChatGroupsError = action.error.message;
         })
         .addCase(getAllGlobalChatGroups.fulfilled, (state, action) => {
            state.allGlobalChatGroups = action.payload.data;
            state.allGlobalChatGroupsLoading = false;
            state.allGlobalChatGroupsError = null;
         });

      bulder
         .addCase(getUserGlobalChats.pending, (state) => {
            // state.groupChats = null;
            state.groupChatsLoading = true;
            state.groupChatsError = null;
            state.loadMoreChatMessages = true;
         })
         .addCase(getUserGlobalChats.rejected, (state, action) => {
            state.groupChats = null;
            state.groupChatsLoading = false;
            state.groupChatsError = action.error.message;
            state.loadMoreChatMessages = false;
         })
         .addCase(getUserGlobalChats.fulfilled, (state, action) => {
            const { groupMessages } = action.payload?.data?.chats;

            if (state.groupChats && state.groupChats?.success && state.groupChats?.chats) {
               state.groupChats = {
                  ...state.groupChats,
                  page: state.groupChats?.page + 1,
                  chats: {
                     ...state.groupChats?.chats,
                     groupMessages: [...state.groupChats?.chats?.groupMessages, ...groupMessages],
                  },
               };
            } else {
               state.groupChats = action.payload.data;
            }

            state.groupChatsLoading = false;
            state.groupChatsError = null;
            state.loadMoreChatMessages = false;
         });

      bulder
         .addCase(getUserFriendList.pending, (state) => {
            state.userFriendsList = null;
            state.userFriendsFetchLoading = true;
            state.userFriendsFetchError = null;
         })
         .addCase(getUserFriendList.rejected, (state, action) => {
            state.userFriendsList = null;
            state.userFriendsFetchLoading = false;
            state.userFriendsFetchError = action.error.message;
         })
         .addCase(getUserFriendList.fulfilled, (state, action) => {
            state.userFriendsList = action.payload.data;
            state.userFriendsFetchLoading = false;
            state.userFriendsFetchError = null;
         });

      bulder
         .addCase(getUserWageredAmountGraph.pending, (state) => {
            state.userWageredAmount = null;
            state.userWageredAmountLoading = true;
            state.userWageredAmountError = null;
         })
         .addCase(getUserWageredAmountGraph.rejected, (state, action) => {
            state.userWageredAmount = null;
            state.userWageredAmountLoading = false;
            state.userWageredAmountError = action.error.message;
         })
         .addCase(getUserWageredAmountGraph.fulfilled, (state, action) => {
            state.userWageredAmount = action.payload.data;
            state.userWageredAmountLoading = false;
            state.userWageredAmountError = null;
         });

      bulder
         .addCase(getUserRoleLists.pending, (state) => {
            state.userRolesList = null;
            state.userRolesListLoading = true;
            state.userRolesListError = null;
         })
         .addCase(getUserRoleLists.rejected, (state, action) => {
            state.userRolesList = null;
            state.userRolesListLoading = false;
            state.userRolesListError = action.error.message;
         })
         .addCase(getUserRoleLists.fulfilled, (state, action) => {
            state.userRolesList = action.payload.data;
            state.userRolesListLoading = false;
            state.userRolesListError = null;
         });

      bulder
         .addCase(getUserByRoles.pending, (state) => {
            state.supportTeamUsers = null;
            state.supportTeamUsersLoading = true;
            state.supportTeamUsersError = null;
         })
         .addCase(getUserByRoles.rejected, (state, action) => {
            state.supportTeamUsers = null;
            state.supportTeamUsersLoading = false;
            state.supportTeamUsersError = action.error.message;
         })
         .addCase(getUserByRoles.fulfilled, (state, action) => {
            state.supportTeamUsers = action.payload.data;
            state.supportTeamUsersLoading = false;
            state.supportTeamUsersError = null;
         });
   },
});

export const { removeAccountErrors, removeGroupMessage, selectedGroupHandler } = userManagementSlice.actions;

export default userManagementSlice.reducer;
