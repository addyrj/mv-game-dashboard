import { createSlice } from '@reduxjs/toolkit';
import {
   getTopFavoriteGames,
   getGameCurrencysList,
   inertNewGameCurrency,
   deleteSingleGameCurrency,
   getSingleGameCurrency,
   updateSingleGameCurrency,
   insertNewGame,
   getGamesLists,
   deleteSingleGame,
   getGameProvidersList,
   getAllGamesCategroy,
   updateSingleGame,
   postNewGameCategory,
   updateGameCategory,
   getAllProductsCategory,
   getSinglegameCategory,
   deleteSingleGameCategory,
   getAllCurrencyList,
   getGameCurrency,
} from './GameActions';

const INITAL_STATE = {
   topFavoriteGames: null,
   topFavoriteGamesLoading: false,
   topFavoriteGamesError: null,
   uploadCurrencyInfo: null,
   uploadCurrencyLoading: false,
   uploadCurrencyError: null,
   deleteSingleGameCurrencyError: null,
   deleteSingleGameCurrencyLoading: false,
   singleGameCurrency: null,
   singleGameCurrencyLoading: false,
   singleGameCurrencyError: null,
   updateGameCurrency: null,
   updateGameCurrencyLoading: false,
   updateGameCurrencyError: null,
   gameCurrencyListInfo: null,
   gameCurrencyListLoading: false,
   gameCurrencyListError: null,
   insertGameInfo: null,
   insertGameLoading: false,
   insertGameError: null,
   gameListInfo: null,
   gameListLoading: false,
   gameListInfoError: null,
   updateGameinfo: null,
   updateGameLoading: false,
   updateGameError: null,
   deleteGameLoading: false,
   deleteGameError: null,
   gameProvidersList: null,
   gameProvidersLoading: false,
   gameProvidersError: null,
   allGamesCategorys: null,
   allGamesCategorysLoading: false,
   allGamesCategorysError: null,
   newGameCategory: null,
   newGameCategoryLoading: false,
   newGameCategoryError: null,
   updateGameCategoryLoading: false,
   updateGameCategoryError: null,
   allCategoryInfo: null,
   getAllCategoryInfoLoading: false,
   getAllCategoryInfoError: null,
   singleGameCategory: null,
   singleGameCategoryLoading: false,
   singleGameCategoryError: null,
   deleteSingelGameCategoryError: null,
   deleteSingleGameCategoryLoading: false,
   currencyList: null,
   currencyListLoading: false,
   currencyListError: null,
   allGameCurrencyList: null,
   allGameCurrencyListLoading: false,
   allGameCurrencyListError: null,
};

const gameSlice = createSlice({
   name: 'games',
   initialState: INITAL_STATE,
   reducers: {
      removeGameInfo: (state) => {
         state.insertGameInfo = null;
         state.insertGameError = null;
         state.updateGameinfo = null;
         state.updateGameError = null;
      },
      removeCurrencyInfo: (state) => {
         state.updateGameCurrency = null;
         state.singleGameCurrency = null;
         state.uploadCurrencyInfo = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getTopFavoriteGames.pending, (state) => {
            state.topFavoriteGames = null;
            state.topFavoriteGamesLoading = true;
            state.topFavoriteGamesError = null;
         })
         .addCase(getTopFavoriteGames.rejected, (state, action) => {
            state.topFavoriteGames = null;
            state.topFavoriteGamesLoading = false;
            state.topFavoriteGamesError = action.error.message;
         })
         .addCase(getTopFavoriteGames.fulfilled, (state, action) => {
            state.topFavoriteGames = action.payload?.data;
            state.topFavoriteGamesLoading = false;
            state.topFavoriteGamesError = null;
         });

      bulder
         .addCase(inertNewGameCurrency.pending, (state) => {
            state.uploadCurrencyInfo = null;
            state.uploadCurrencyLoading = true;
            state.uploadCurrencyError = null;
         })
         .addCase(inertNewGameCurrency.rejected, (state, action) => {
            state.uploadCurrencyInfo = null;
            state.uploadCurrencyLoading = false;
            state.uploadCurrencyError = action.error.message;
         })
         .addCase(inertNewGameCurrency.fulfilled, (state, action) => {
            state.uploadCurrencyInfo = action.payload.data;
            state.uploadCurrencyLoading = false;
            state.uploadCurrencyError = null;
         });

      bulder
         .addCase(deleteSingleGameCurrency.pending, (state) => {
            state.deleteSingleGameCurrencyError = null;
            state.deleteSingleGameCurrencyLoading = true;
         })
         .addCase(deleteSingleGameCurrency.rejected, (state, action) => {
            state.deleteSingleGameCurrencyError = action.error.message;
            state.deleteSingleGameCurrencyLoading = false;
         })
         .addCase(deleteSingleGameCurrency.fulfilled, (state, action) => {
            state.deleteSingleGameCurrencyError = null;
            state.deleteSingleGameCurrencyLoading = false;
            state.gameCurrencyListInfo = {
               ...state.gameCurrencyListInfo,
               currency: state.gameCurrencyListInfo.currency.filter(
                  (el) => el._id !== action.payload?.data?.id
               ),
            };
         });

      bulder
         .addCase(getSingleGameCurrency.pending, (state) => {
            state.singleGameCurrency = null;
            state.singleGameCurrencyLoading = true;
            state.singleGameCurrencyError = null;
         })
         .addCase(getSingleGameCurrency.rejected, (state, action) => {
            state.singleGameCurrency = null;
            state.singleGameCurrencyLoading = false;
            state.singleGameCurrencyError = action.error.message;
         })
         .addCase(getSingleGameCurrency.fulfilled, (state, action) => {
            state.singleGameCurrency = action.payload.data;
            state.singleGameCurrencyLoading = false;
            state.singleGameCurrencyError = null;
         });

      bulder
         .addCase(updateSingleGameCurrency.pending, (state) => {
            state.updateGameCurrency = null;
            state.updateGameCurrencyLoading = true;
            state.updateGameCurrencyError = null;
         })
         .addCase(updateSingleGameCurrency.rejected, (state, action) => {
            state.updateGameCurrency = null;
            state.updateGameCurrencyLoading = false;
            state.updateGameCurrencyError = action.error.message;
         })
         .addCase(updateSingleGameCurrency.fulfilled, (state, action) => {
            state.updateGameCurrency = action.payload.data;
            state.updateGameCurrencyLoading = false;
            state.updateGameCurrencyError = null;
         });

      bulder
         .addCase(getGameCurrencysList.pending, (state) => {
            state.gameCurrencyListInfo = null;
            state.gameCurrencyListLoading = true;
            state.gameCurrencyListError = null;
         })
         .addCase(getGameCurrencysList.rejected, (state, action) => {
            state.gameCurrencyListInfo = null;
            state.gameCurrencyListLoading = false;
            state.gameCurrencyListError = action.error.message;
         })
         .addCase(getGameCurrencysList.fulfilled, (state, action) => {
            state.gameCurrencyListInfo = action.payload.data;
            state.gameCurrencyListLoading = false;
            state.gameCurrencyListError = null;
         });

      bulder
         .addCase(insertNewGame.pending, (state) => {
            state.insertGameInfo = null;
            state.insertGameLoading = true;
            state.insertGameError = null;
         })
         .addCase(insertNewGame.rejected, (state, action) => {
            state.insertGameInfo = null;
            state.insertGameLoading = false;
            state.insertGameError = action.error.message;
         })
         .addCase(insertNewGame.fulfilled, (state, action) => {
            state.insertGameInfo = action.payload.data;
            state.insertGameLoading = false;
            state.insertGameError = null;
         });

      bulder
         .addCase(getGamesLists.pending, (state) => {
            state.gameListInfo = null;
            state.gameListLoading = true;
            state.gameListInfoError = null;
         })
         .addCase(getGamesLists.rejected, (state, action) => {
            state.gameListInfo = null;
            state.gameListLoading = false;
            state.gameListInfoError = action.error.message;
         })
         .addCase(getGamesLists.fulfilled, (state, action) => {
            state.gameListInfo = action.payload.data;
            state.gameListLoading = false;
            state.gameListInfoError = null;
         });

      bulder
         .addCase(updateSingleGame.pending, (state) => {
            state.updateGameinfo = null;
            state.updateGameLoading = true;
            state.updateGameError = null;
         })
         .addCase(updateSingleGame.rejected, (state, action) => {
            state.updateGameinfo = null;
            state.updateGameLoading = false;
            state.updateGameError = action.error.message;
         })
         .addCase(updateSingleGame.fulfilled, (state, action) => {
            state.updateGameinfo = action.payload.data;
            state.updateGameLoading = false;
            state.updateGameError = null;
         });

      bulder
         .addCase(deleteSingleGame.pending, (state) => {
            state.deleteGameLoading = true;
            state.deleteGameError = null;
         })
         .addCase(deleteSingleGame.rejected, (state, action) => {
            state.deleteGameLoading = false;
            state.deleteGameError = action.error.message;
         })
         .addCase(deleteSingleGame.fulfilled, (state, action) => {
            state.deleteGameLoading = false;
            state.deleteGameError = null;
            state.gameListInfo = {
               ...state.gameListInfo,
               games: state.gameListInfo?.games.filter(
                  (el) => el?._id !== action.payload?.data?.gameId
               ),
            };
         });

      bulder
         .addCase(getGameProvidersList.pending, (state) => {
            state.gameProvidersList = null;
            state.gameProvidersLoading = true;
            state.gameProvidersError = null;
         })
         .addCase(getGameProvidersList.rejected, (state, action) => {
            state.gameProvidersList = null;
            state.gameProvidersLoading = false;
            state.gameProvidersError = action.error.message;
         })
         .addCase(getGameProvidersList.fulfilled, (state, action) => {
            state.gameProvidersList = action.payload.data;
            state.gameProvidersLoading = false;
            state.gameProvidersError = null;
         });

      bulder
         .addCase(getAllGamesCategroy.pending, (state) => {
            state.allGamesCategorys = null;
            state.allGamesCategorysLoading = true;
            state.allGamesCategorysError = null;
         })
         .addCase(getAllGamesCategroy.rejected, (state, action) => {
            state.allGamesCategorys = null;
            state.allGamesCategorysLoading = false;
            state.allGamesCategorysError = action.error.message;
         })
         .addCase(getAllGamesCategroy.fulfilled, (state, action) => {
            state.allGamesCategorys = action.payload?.data;
            state.allGamesCategorysLoading = false;
            state.allGamesCategorysError = null;
         });

      bulder
         .addCase(postNewGameCategory.pending, (state) => {
            state.newGameCategory = null;
            state.newGameCategoryLoading = true;
            state.newGameCategoryError = null;
         })
         .addCase(postNewGameCategory.rejected, (state, action) => {
            state.newGameCategory = null;
            state.newGameCategoryLoading = false;
            state.newGameCategoryError = action.error.message;
         })
         .addCase(postNewGameCategory.fulfilled, (state, action) => {
            state.allCategoryInfo = action.payload?.data?.category?._id
               ? {
                    ...state.allCategoryInfo,
                    categorys: [
                       ...state.allCategoryInfo?.categorys,
                       {
                          _id: action.payload?.data?.category?._id,
                          name: action.payload?.data?.category?.name,
                          status: action.payload?.data?.category?.status,
                       },
                    ],
                 }
               : state.allCategoryInfo;
            state.newGameCategory = action.payload?.data?.message;
            state.newGameCategoryLoading = false;
            state.newGameCategoryError = null;
         });

      bulder
         .addCase(updateGameCategory.pending, (state) => {
            state.newGameCategory = null;
            state.updateGameCategoryLoading = true;
            state.updateGameCategoryError = null;
         })
         .addCase(updateGameCategory.rejected, (state, action) => {
            state.newGameCategory = null;
            state.updateGameCategoryLoading = false;
            state.updateGameCategoryError = action.error.message;
         })
         .addCase(updateGameCategory.fulfilled, (state, action) => {
            if (action.payload?.data?._id) {
               const updateObject = action.payload?.data;

               state.allCategoryInfo = {
                  ...state.allCategoryInfo,
                  categorys: state.allCategoryInfo?.categorys.map((el) =>
                     el?._id?._id === updateObject?._id
                        ? {
                             ...el,
                             _id: {
                                ...el?._id,
                                name: updateObject?.name,
                                status: updateObject?.status,
                             },
                          }
                        : el
                  ),
               };
            }

            state.newGameCategory = action.payload?.data?.message;
            state.updateGameCategoryLoading = false;
            state.updateGameCategoryError = null;
         });

      bulder
         .addCase(getAllProductsCategory.pending, (state) => {
            state.allCategoryInfo = null;
            state.getAllCategoryInfoLoading = true;
            state.getAllCategoryInfoError = null;
         })
         .addCase(getAllProductsCategory.rejected, (state, action) => {
            state.allCategoryInfo = null;
            state.getAllCategoryInfoLoading = false;
            state.getAllCategoryInfoError = action.error.message;
         })
         .addCase(getAllProductsCategory.fulfilled, (state, action) => {
            state.allCategoryInfo = action.payload?.data;
            state.getAllCategoryInfoLoading = false;
            state.getAllCategoryInfoError = null;
         });

      bulder
         .addCase(getSinglegameCategory.pending, (state) => {
            state.singleGameCategory = null;
            state.singleGameCategoryLoading = true;
            state.singleGameCategoryError = null;
         })
         .addCase(getSinglegameCategory.rejected, (state, action) => {
            state.singleGameCategory = null;
            state.singleGameCategoryLoading = false;
            state.singleGameCategoryError = action.error.message;
         })
         .addCase(getSinglegameCategory.fulfilled, (state, action) => {
            state.singleGameCategory = action.payload?.data;
            state.singleGameCategoryLoading = false;
            state.singleGameCategoryError = null;
         });

      bulder
         .addCase(deleteSingleGameCategory.pending, (state) => {
            state.deleteSingelGameCategoryError = null;
            state.deleteSingleGameCategoryLoading = true;
         })
         .addCase(deleteSingleGameCategory.rejected, (state, action) => {
            state.deleteSingelGameCategoryError = null;
            state.deleteSingleGameCategoryLoading = false;
         })
         .addCase(deleteSingleGameCategory.fulfilled, (state, action) => {
            if (!!action.payload?.data?.categoryId) {
               state.allCategoryInfo = {
                  ...state.allCategoryInfo,
                  categorys: state.allCategoryInfo?.categorys.filter(
                     (el) => el?._id?._id !== action.payload?.data?.categoryId
                  ),
               };
            }
            state.deleteSingelGameCategoryError = null;
            state.deleteSingleGameCategoryLoading = false;
         });

      bulder
         .addCase(getAllCurrencyList.pending, (state) => {
            state.currencyList = null;
            state.currencyListLoading = true;
            state.currencyListError = null;
         })
         .addCase(getAllCurrencyList.rejected, (state, action) => {
            state.currencyList = null;
            state.currencyListLoading = false;
            state.currencyListError = action.error.message;
         })
         .addCase(getAllCurrencyList.fulfilled, (state, action) => {
            state.currencyList = action.payload?.data;
            state.currencyListLoading = false;
            state.currencyListError = null;
         });

      bulder
         .addCase(getGameCurrency.pending, (state) => {
            state.allGameCurrencyList = null;
            state.allGameCurrencyListLoading = true;
            state.allGameCurrencyListError = null;
         })
         .addCase(getGameCurrency.rejected, (state, action) => {
            state.allGameCurrencyList = null;
            state.allGameCurrencyListLoading = false;
            state.allGameCurrencyListError = action.error.message;
         })
         .addCase(getGameCurrency.fulfilled, (state, action) => {
            state.allGameCurrencyList = action.payload?.data;
            state.allGameCurrencyListLoading = false;
            state.allGameCurrencyListError = null;
         });
   },
});

export const { removeGameInfo, removeCurrencyInfo } = gameSlice.actions;

export default gameSlice.reducer;
