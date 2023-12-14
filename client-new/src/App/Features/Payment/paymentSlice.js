import { createSlice } from '@reduxjs/toolkit';
import {
   faitCurrencyWithdrawHandler,
   updateCryptoCurrency,
   updateFiatWalletAmount,
} from '../ActionHelpers/helper';
import {
   getFiatCurrencyListsWithAmount,
   getSelectedCurrencyPaymentOptions,
   getSelectedCurrencyAmount,
   getUserAllFiatCurrency,
   getUserAllCryptoCurrency,
   getUserCryptoWalletAddress,
   getUserSelectedGameCurrency,
   getUserSelectedCuryptoCr,
   fiatPaymentTransaction,
   getUserFiatTransaction,
   getSelectedTransactionInfo,
   getSelectedPaymentFields,
   makeUserFiatWithdrawTransaction,
   getUserFiatWithdrawTransactions,
   withdrawCryptoCurrency,
   getUserCryptoWithdrawTransactions,
   getSelectedCryptoTransactionInfo,
   getUserCryptoDepositTransactions,
} from './paymentActions';

const INITAL_STATE = {
   selectedGameCurrency: null,
   faitCurrency: null,
   faitCurrencyLoading: false,
   faitCurrencyError: null,
   selectedCurrencyMethods: null,
   selectedCurrencyMethodsLoading: false,
   selectedCurrencyMethodsError: null,
   selectedCurrencyAmount: null,
   selectedCurrencyAmountLoading: false,
   selectedCurrencyAmountError: null,
   walletFiatCurrencyData: null,
   walletFiatCurrencyDataLoading: false,
   walletFiatCurrencyDataError: null,
   userCryptoCurrencyList: null,
   userCryptoCurrencyListLoading: false,
   userCryptoCurrencyListError: null,
   showPaymentCurrencyDropDown: false,
   userCryptoWalletAddress: null,
   userCryptoWalletAddressLoading: false,
   userCryptoWalletAddressError: null,
   gameSelectedCurrency: null,
   gameSelectedCurrencyLoading: false,
   gameSelectedCurrencyError: null,
   fiatPaymentTransactionLoading: false,
   fiatPaymentTransactionError: null,
   showPaymentTransactionProcess: false,
   showTransactionInfo: false,
   depositTransactions: null,
   depositTransactionsLoading: false,
   depositTransactionsError: null,
   selectedTransaction: null,
   selectedTransactionLoading: false,
   selectedTransactionError: null,
   selectedCrPaymentOptions: false,
   fiatPaymentWithDrawPopup: false,
   selectedPaymentFields: null,
   selectedPaymentFieldsLoading: false,
   selectedPaymentFieldsError: null,
   fiatTransactionsWithdrawLoading: false,
   fiatTransactionsWithdrawError: null,
   selectedCurrencyWithAmount: null,
   withdrawTransactionInfo: null,
   withdrawTransactionLoading: false,
   withdrawTransactionError: null,
   withdrawCryptoInfo: null,
   withdrawCryptoInfoLoading: false,
   withdrawCryptoInfoError: null,
   moneyUpdateAnimation: null,
};

const paymentSlice = createSlice({
   name: 'payment',
   initialState: INITAL_STATE,
   reducers: {
      showAndHideCurrencyDropDown: (state, action) => {
         state.showPaymentCurrencyDropDown = action?.payload;
      },
      userGameSelectedCurrency: (state, action) => {
         const currencyObject = {
            _id: action?.payload?._id,
            icon: action?.payload?.icon,
            currencyName: action?.payload?.name,
            type: action?.payload?.type,
            balance: action?.payload?.amount,
         };

         state.gameSelectedCurrency = {
            ...state.gameSelectedCurrency,
            currency: currencyObject,
         };
      },
      showAndHidePaymentTransactionPopup: (state, action) => {
         state.showPaymentTransactionProcess = action.payload;
      },
      updateUserFaitWallet: (state, action) => {
         updateFiatWalletAmount(state, action);
      },
      showMoneyAnimation: (state, action) => {
         state.moneyUpdateAnimation = {
            status: action.payload?.status,
            show: action.payload?.show,
         };
      },
      decreaseUserFiatWalletBlc: (state, action) => {
         faitCurrencyWithdrawHandler(state, action);
      },
      updateUserCryptoWallet: (state, action) => {
         updateCryptoCurrency(state, action);
      },
      showAndHideTransactionInfo: (state, action) => {
         state.showTransactionInfo = action.payload;
      },
      isAlreadyGetPayOptions: (state, action) => {
         state.selectedCrPaymentOptions = action.payload;
      },
      showAndHideWithdrawPopup: (state, action) => {
         state.fiatPaymentWithDrawPopup = action.payload;
      },
      selectedCurrencyAmountHandler: (state, action) => {
         state.selectedCurrencyWithAmount = action.payload;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getFiatCurrencyListsWithAmount.pending, (state) => {
            state.faitCurrency = null;
            state.faitCurrencyLoading = true;
            state.faitCurrencyError = null;
         })
         .addCase(getFiatCurrencyListsWithAmount.rejected, (state, action) => {
            state.faitCurrency = null;
            state.faitCurrencyLoading = false;
            state.faitCurrencyError = action?.error?.message;
         })
         .addCase(getFiatCurrencyListsWithAmount.fulfilled, (state, action) => {
            state.faitCurrency = action.payload?.data;
            state.faitCurrencyLoading = false;
            state.faitCurrencyError = null;
         });

      bulder
         .addCase(getSelectedCurrencyPaymentOptions.pending, (state) => {
            state.selectedCurrencyMethods = null;
            state.selectedCurrencyMethodsLoading = true;
            state.selectedCurrencyMethodsError = null;
         })
         .addCase(
            getSelectedCurrencyPaymentOptions.rejected,
            (state, action) => {
               state.selectedCurrencyMethods = false;
               state.selectedCurrencyMethodsLoading = false;
               state.selectedCurrencyMethodsError = action?.error?.message;
            }
         )
         .addCase(
            getSelectedCurrencyPaymentOptions.fulfilled,
            (state, action) => {
               state.selectedCurrencyMethods = action.payload?.data;
               state.selectedCurrencyMethodsLoading = null;
               state.selectedCurrencyMethodsError = null;
            }
         );

      bulder
         .addCase(getSelectedCurrencyAmount.pending, (state) => {
            state.selectedCurrencyAmount = null;
            state.selectedCurrencyAmountLoading = true;
            state.selectedCurrencyAmountError = null;
         })
         .addCase(getSelectedCurrencyAmount.rejected, (state, action) => {
            state.selectedCurrencyAmount = null;
            state.selectedCurrencyAmountLoading = false;
            state.selectedCurrencyAmountError = action?.error?.message;
         })
         .addCase(getSelectedCurrencyAmount.fulfilled, (state, action) => {
            state.selectedCurrencyAmount = action.payload?.data;
            state.selectedCurrencyAmountLoading = false;
            state.selectedCurrencyAmountError = null;
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
         .addCase(getUserCryptoWalletAddress.pending, (state) => {
            state.userCryptoWalletAddress = null;
            state.userCryptoWalletAddressLoading = true;
            state.userCryptoWalletAddressError = null;
         })
         .addCase(getUserCryptoWalletAddress.rejected, (state, action) => {
            state.userCryptoWalletAddress = null;
            state.userCryptoWalletAddressLoading = false;
            state.userCryptoWalletAddressError = action?.error?.message;
         })
         .addCase(getUserCryptoWalletAddress.fulfilled, (state, action) => {
            state.userCryptoWalletAddress = action.payload?.data;
            state.userCryptoWalletAddressLoading = false;
            state.userCryptoWalletAddressError = null;
         });

      bulder
         .addCase(getUserSelectedGameCurrency.pending, (state) => {
            state.gameSelectedCurrency = null;
            state.gameSelectedCurrencyLoading = true;
            state.gameSelectedCurrencyError = null;
         })
         .addCase(getUserSelectedGameCurrency.rejected, (state, action) => {
            state.gameSelectedCurrency = null;
            state.gameSelectedCurrencyLoading = false;
            state.gameSelectedCurrencyError = action?.error?.message;
         })
         .addCase(getUserSelectedGameCurrency.fulfilled, (state, action) => {
            state.gameSelectedCurrency = action.payload?.data?.item;
            state.gameSelectedCurrencyLoading = false;
            state.gameSelectedCurrencyError = null;
         });

      bulder
         .addCase(getUserSelectedCuryptoCr.pending, (state) => {
            state.gameSelectedCurrency = null;
            state.gameSelectedCurrencyLoading = true;
            state.gameSelectedCurrencyError = null;
         })
         .addCase(getUserSelectedCuryptoCr.rejected, (state, action) => {
            state.gameSelectedCurrency = null;
            state.gameSelectedCurrencyLoading = false;
            state.gameSelectedCurrencyError = action?.error?.message;
         })
         .addCase(getUserSelectedCuryptoCr.fulfilled, (state, action) => {
            const response = action.payload?.data;

            if (response) {
               state.gameSelectedCurrency = {
                  ...state.gameSelectedCurrency,
                  currency: {
                     ...state.gameSelectedCurrency?.currency,
                     icon: response?.data?.icon,
                     balance: response?.data?.balance,
                     currencyName: response?.data?.symbol,
                  },
               };
            }
            state.gameSelectedCurrencyLoading = false;
            state.gameSelectedCurrencyError = null;
         });

      bulder
         .addCase(fiatPaymentTransaction.pending, (state) => {
            state.fiatPaymentTransactionLoading = true;
            state.fiatPaymentTransactionError = null;
         })
         .addCase(fiatPaymentTransaction.rejected, (state, action) => {
            state.fiatPaymentTransactionLoading = false;
            state.fiatPaymentTransactionError = action.error.message;
         })
         .addCase(fiatPaymentTransaction.fulfilled, (state, action) => {
            state.fiatPaymentTransactionLoading = false;
            state.fiatPaymentTransactionError = null;
            state.showPaymentTransactionProcess = true;
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
         .addCase(getUserCryptoDepositTransactions.pending, (state) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = true;
            state.depositTransactionsError = null;
         })
         .addCase(
            getUserCryptoDepositTransactions.rejected,
            (state, action) => {
               state.depositTransactions = null;
               state.depositTransactionsLoading = false;
               state.depositTransactionsError = action.error?.message;
            }
         )
         .addCase(
            getUserCryptoDepositTransactions.fulfilled,
            (state, action) => {
               state.depositTransactions = action.payload?.data;
               state.depositTransactionsLoading = false;
               state.depositTransactionsError = null;
            }
         );

      bulder
         .addCase(getSelectedTransactionInfo.pending, (state) => {
            state.selectedTransaction = null;
            state.selectedTransactionLoading = true;
            state.selectedTransactionError = null;
         })
         .addCase(getSelectedTransactionInfo.rejected, (state, action) => {
            state.selectedTransaction = null;
            state.selectedTransactionLoading = false;
            state.selectedTransactionError = action.error?.message;
         })
         .addCase(getSelectedTransactionInfo.fulfilled, (state, action) => {
            state.selectedTransaction = action.payload?.data;
            state.selectedTransactionLoading = false;
            state.selectedTransactionError = null;
         });

      bulder
         .addCase(getSelectedCryptoTransactionInfo.pending, (state) => {
            state.selectedTransaction = null;
            state.selectedTransactionLoading = true;
            state.selectedTransactionError = null;
         })
         .addCase(
            getSelectedCryptoTransactionInfo.rejected,
            (state, action) => {
               state.selectedTransaction = null;
               state.selectedTransactionLoading = false;
               state.selectedTransactionError = action.error?.message;
            }
         )
         .addCase(
            getSelectedCryptoTransactionInfo.fulfilled,
            (state, action) => {
               state.selectedTransaction = action.payload?.data;
               state.selectedTransactionLoading = false;
               state.selectedTransactionError = null;
            }
         );

      bulder
         .addCase(getSelectedPaymentFields.pending, (state) => {
            state.selectedPaymentFields = null;
            state.selectedPaymentFieldsLoading = true;
            state.selectedPaymentFieldsError = null;
         })
         .addCase(getSelectedPaymentFields.rejected, (state, action) => {
            state.selectedPaymentFields = null;
            state.selectedPaymentFieldsLoading = false;
            state.selectedPaymentFieldsError = action.error?.message;
         })
         .addCase(getSelectedPaymentFields.fulfilled, (state, action) => {
            state.selectedPaymentFields = action.payload?.data;
            state.selectedPaymentFieldsLoading = false;
            state.selectedPaymentFieldsError = null;
         });

      bulder
         .addCase(makeUserFiatWithdrawTransaction.pending, (state) => {
            state.fiatTransactionsWithdrawLoading = true;
            state.fiatTransactionsWithdrawError = null;
         })
         .addCase(makeUserFiatWithdrawTransaction.rejected, (state, action) => {
            state.fiatTransactionsWithdrawLoading = false;
            state.fiatTransactionsWithdrawError = action.error?.message;
         })
         .addCase(
            makeUserFiatWithdrawTransaction.fulfilled,
            (state, action) => {
               faitCurrencyWithdrawHandler(state, action);
               state.fiatTransactionsWithdrawLoading = false;
               state.fiatTransactionsWithdrawError = null;
               state.fiatPaymentWithDrawPopup = false;
               state.showPaymentTransactionProcess = true;
            }
         );

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
         .addCase(
            getUserFiatWithdrawTransactions.fulfilled,
            (state, action) => {
               state.withdrawTransactionInfo = action.payload?.data;
               state.withdrawTransactionLoading = false;
               state.withdrawTransactionError = null;
            }
         );

      bulder
         .addCase(getUserCryptoWithdrawTransactions.pending, (state) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = true;
            state.withdrawTransactionError = null;
         })
         .addCase(
            getUserCryptoWithdrawTransactions.rejected,
            (state, action) => {
               state.withdrawTransactionInfo = null;
               state.withdrawTransactionLoading = false;
               state.withdrawTransactionError = action.error?.message;
            }
         )
         .addCase(
            getUserCryptoWithdrawTransactions.fulfilled,
            (state, action) => {
               state.withdrawTransactionInfo = action.payload?.data;
               state.withdrawTransactionLoading = false;
               state.withdrawTransactionError = null;
            }
         );

      bulder
         .addCase(withdrawCryptoCurrency.pending, (state) => {
            state.withdrawCryptoInfo = null;
            state.withdrawCryptoInfoLoading = true;
            state.withdrawCryptoInfoError = null;
         })
         .addCase(withdrawCryptoCurrency.rejected, (state, action) => {
            state.withdrawCryptoInfo = null;
            state.withdrawCryptoInfoLoading = false;
            state.withdrawCryptoInfoError = action.error?.message;
         })
         .addCase(withdrawCryptoCurrency.fulfilled, (state, action) => {
            const response = action?.payload?.data;

            if (response) {
               state.userCryptoCurrencyList = state.userCryptoCurrencyList
                  ? {
                       ...state.userCryptoCurrencyList,
                       data: state.userCryptoCurrencyList?.data.map((el) =>
                          el?.symbol === response?.currencyId
                             ? { ...el, balance: response?.updatedBal }
                             : el
                       ),
                    }
                  : state.userCryptoCurrencyList;

               const seelctedCrItem = state.gameSelectedCurrency;

               state.gameSelectedCurrency = {
                  ...seelctedCrItem,
                  currency:
                     seelctedCrItem?.currency?.currencyName ===
                     response?.currencyId
                        ? {
                             ...seelctedCrItem?.currency,
                             balance: response?.updatedBal,
                          }
                        : state.gameSelectedCurrency?.currency,
               };
            }

            state.withdrawCryptoInfo = action.payload?.data;
            state.withdrawCryptoInfoLoading = false;
            state.withdrawCryptoInfoError = null;
            state.showPaymentTransactionProcess = true;
         });
   },
});

export const {
   showAndHideCurrencyDropDown,
   userGameSelectedCurrency,
   showAndHidePaymentTransactionPopup,
   updateUserFaitWallet,
   updateUserCryptoWallet,
   showAndHideTransactionInfo,
   isAlreadyGetPayOptions,
   showAndHideWithdrawPopup,
   selectedCurrencyAmountHandler,
   decreaseUserFiatWalletBlc,
   showMoneyAnimation,
} = paymentSlice.actions;

export default paymentSlice.reducer;
