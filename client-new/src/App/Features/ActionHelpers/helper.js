export const SetGamesHandler = function (state, action, stateObject) {
   const gamesData = action.payload?.data?.games[0]?.games;

   if (action?.payload?.data?.page === 0) {
      state[stateObject.stateKey] = null;
   }

   state[stateObject.stateKey] =
      !!state[stateObject.stateKey] &&
      state[stateObject.stateKey]?.games &&
      state[stateObject.stateKey]?.games.length
         ? {
              ...state[stateObject.stateKey],
              games: [
                 {
                    ...state[stateObject.stateKey]?.games[0],
                    games: state[stateObject.stateKey]?.games[0].games.concat(
                       gamesData
                    ),
                 },
              ],
           }
         : action.payload?.data;
   state[stateObject.stateLoadingKey] = false;
   state[state.stateErrorKey] = null;
};

export const SetGamesCommentHandler = function (state, action) {
   const messageObject = action.payload?.data?.message;

   state.gameCommentsInfo = {
      ...state?.gameCommentsInfo,
      comments: state.gameCommentsInfo?.comments.length
         ? [
              {
                 ...state?.gameCommentsInfo?.comments[0],
                 _id: {
                    _id: state.gameCommentsInfo?.comments[0]?._id?._id,
                    totalComments:
                       state.gameCommentsInfo?.comments[0]?._id?.totalComments +
                       1,
                 },
                 comments: [
                    {
                       userId: messageObject?.userId,
                       _id: messageObject?._id,
                       comment: messageObject?.comment,
                       avatar: messageObject?.avatar,
                       userName: messageObject?.userName,
                       createdAt: messageObject?.createdAt,
                    },
                    ...state?.gameCommentsInfo?.comments[0]?.comments,
                 ],
              },
           ]
         : state.gameCommentsInfo.comments.concat({
              _id: {
                 _id: state.gameCommentsInfo?.comments[0]?._id?._id,
                 totalComments: 1,
              },
              comments: [
                 {
                    userId: messageObject?.userId,
                    _id: messageObject?._id,
                    comment: messageObject?.comment,
                    avatar: messageObject?.avatar,
                    userName: messageObject?.userName,
                    createdAt: messageObject?.createdAt,
                 },
              ],
           }),
   };
   state.sendGameCommentLoading = false;
   state.sendGameCommentError = null;
};

export const LikeGameCommentHandler = (state, action) => {
   const likeInfo = action.payload.data;
   state.likeCommentLoading = false;
   state.likeCommentError = null;
   state.gameCommentsInfo = {
      ...state.gameCommentsInfo,
      comments: [
         {
            ...state.gameCommentsInfo?.comments[0],
            comments: state.gameCommentsInfo?.comments[0]?.comments.map((el) =>
               likeInfo?.type === 'likeComment' &&
               el._id === likeInfo?.commentId
                  ? {
                       ...el,
                       likeComment: [{ userId: likeInfo?.userId }],
                       totalLikes: el?.totalLikes + 1,
                    }
                  : likeInfo?.type === 'unlikeComment' &&
                    el._id === likeInfo?.commentId
                  ? {
                       ...el,
                       likeComment: null,
                       totalLikes: el?.totalLikes - 1,
                    }
                  : el
            ),
         },
      ],
   };
};

export const faitCurrencyWithdrawHandler = function (state, action) {
   const data = action?.payload?.data;

   const { payAmount, currencyId } = data;

   if (!!data && data?.success && payAmount && currencyId) {
      const faitCurrencyItems =
         state.walletFiatCurrencyData?.walletCurrency?.[0];

      if (faitCurrencyItems && faitCurrencyItems?.wallet) {
         state.walletFiatCurrencyData = {
            ...state.walletFiatCurrencyData,
            walletCurrency: [
               {
                  ...faitCurrencyItems?._id,
                  wallet: faitCurrencyItems?.wallet.map((el) =>
                     el?._id === currencyId
                        ? {
                             ...el,
                             balance: (Number(el?.balance) - payAmount).toFixed(
                                8
                             ),
                          }
                        : el
                  ),
               },
            ],
         };
      }

      const selectedCurrency = state.gameSelectedCurrency?.currency;

      if (
         selectedCurrency &&
         selectedCurrency?.balance &&
         selectedCurrency?._id
      ) {
         state.gameSelectedCurrency = {
            ...state.gameSelectedCurrency,
            currency: {
               ...state.gameSelectedCurrency?.currency,
               balance:
                  currencyId === selectedCurrency?._id
                     ? (Number(selectedCurrency?.balance) - payAmount).toFixed(
                          8
                       )
                     : selectedCurrency?.balance,
            },
         };
      }
   }
};

export const updateFiatWalletAmount = function (state, action) {
   const currencyId = action?.payload?.currencyId;
   const { userId, amount } = action?.payload;
   const currencyWallet = state?.walletFiatCurrencyData?.walletCurrency?.[0];
   const gameSelectedCr = state.gameSelectedCurrency;
   const faitCurrencyItems = state.faitCurrency?.currency?.[0];

   const userAmount = Number(amount);

   if (currencyWallet && currencyWallet?._id?.userId === userId) {
      state.walletFiatCurrencyData = {
         ...state.walletFiatCurrencyData,
         walletCurrency: [
            {
               ...currencyWallet,
               wallet: currencyWallet?.wallet.map((el) =>
                  el?._id === currencyId
                     ? {
                          ...el,
                          balance: (userAmount + Number(el?.balance)).toFixed(
                             8
                          ),
                       }
                     : el
               ),
            },
         ],
      };
   }

   if (gameSelectedCr) {
      state.gameSelectedCurrency = {
         ...gameSelectedCr,
         currency:
            gameSelectedCr?.currency?._id === currencyId
               ? {
                    ...gameSelectedCr?.currency,
                    balance: (
                       Number(gameSelectedCr?.currency?.balance) + userAmount
                    ).toFixed(8),
                 }
               : gameSelectedCr?.currency,
      };
   }
};

export const updateCryptoCurrency = function (state, action) {
   const { type } = action.payload;

   state.userCryptoCurrencyList = !!state.userCryptoCurrencyList
      ? {
           ...state.userCryptoCurrencyList,
           data: state?.userCryptoCurrencyList?.data
              ? state?.userCryptoCurrencyList?.data.map((el) =>
                   el?.symbol.toLowerCase() ===
                      action?.payload?.symbol.toLowerCase() &&
                   el?.currencyType === action.payload?.currencyType
                      ? {
                           ...el,
                           balance:
                              type === 'increment'
                                 ? (
                                      Number(action.payload?.balance) +
                                      Number(el?.balance)
                                   ).toFixed(8)
                                 : type === 'decrement'
                                 ? (
                                      Number(el?.balance) -
                                      Number(action.payload?.balance)
                                   ).toFixed(8)
                                 : action.payload?.balance,
                        }
                      : el
                )
              : state?.userCryptoCurrencyList?.data,
        }
      : state.userCryptoCurrencyList;

   const currecyState = state.gameSelectedCurrency?.currency;

   if (currecyState) {
      const isSamgeCr =
         currecyState?.currencyName.toLowerCase() ===
         action.payload?.symbol.toLowerCase();

      state.gameSelectedCurrency = {
         ...state.gameSelectedCurrency,
         currency: {
            ...currecyState,
            balance:
               isSamgeCr && type === 'increment'
                  ? (
                       Number(action.payload?.balance) +
                       Number(currecyState?.balance)
                    ).toFixed(8)
                  : isSamgeCr && type === 'decrement'
                  ? (
                       Number(currecyState?.balance) -
                       Number(action.payload?.balance)
                    ).toFixed(8)
                  : currecyState?.balance,
         },
      };
   }
};
