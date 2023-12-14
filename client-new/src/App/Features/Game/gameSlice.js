import { createSlice } from '@reduxjs/toolkit';
import {
   LikeGameCommentHandler,
   SetGamesCommentHandler,
   SetGamesHandler,
} from '../ActionHelpers/helper';
import {
   GameCommentHandler,
   getSingleGameComments,
   likeGameComment,
   SearchGames,
   getQeuryGames,
   getRecentPlayGames,
   getFavoriteGames,
   deleteSingleRecentGame,
   getTopRatedGames,
   getSingleProviderGames,
   getAllGamesLists,
   getPopularGames,
   filterByNameGames,
   getAllGamesProviersWithGameCounts,
   getSelectedProviderGames,
   allGamesLists,
   getNewReleasesGames,
} from './gameAction';

const INITAL_STATE = {
   sendGameCommentLoading: false,
   sendGameCommentError: null,
   gameCommentsInfo: null,
   gameCommentsLoading: false,
   gameCommentsError: null,
   likeCommentLoading: false,
   likeCommentError: null,
   gameSearchLists: null,
   gameSearchListsError: null,
   queryGameLists: null,
   queryGameListsLoading: false,
   queryGameListsError: null,
   recentPlayGamesList: null,
   recentPlayGamesListLoading: false,
   recentPlayGamesListError: null,
   favoriteGamesList: null,
   favoriteGamesListLoading: false,
   favoriteGamesListError: null,
   deleteRecentGameError: null,
   topRatedGames: null,
   topRatedGamesLoading: false,
   topRatedGamesError: null,
   singleProvider: null,
   singleProviderLoading: false,
   singleProviderError: null,
   AllGamesInfo: null,
   AllGamesInfoLoading: false,
   AllGamesInfoError: null,
   gameProviders: [],
   gameProvidersLoading: false,
   gameProvidersError: null,
   selectedProviderGames: null,
   selectedProviderGamesLoading: false,
   selectedProviderGamesError: null,
   allGamesListsInfo: null,
   allGamesListsLoading: false,
   allGamesListsError: null,
   loadMoreLoading: false,
};

const gameSlice = createSlice({
   name: 'games',
   initialState: INITAL_STATE,
   reducers: {
      removeProviderGamesInfo: (state) => {
         state.singleProvider = null;
         state.singleProviderError = null;
      },
      removeAllGamesinfo: (state) => {
         state.AllGamesInfo = null;
         state.AllGamesInfoError = null;
      },
      removeProvidersGames: (state) => {
         state.selectedProviderGames = null;
         state.selectedProviderGamesError = null;
      },
      removeAllGames: (state) => {
         state.allGamesListsInfo = null;
         state.allGamesListsError = null;
      },
      userLogOut: (state) => {
         state.recentPlayGamesList = null;
         state.favoriteGamesList = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(GameCommentHandler.pending, (state) => {
            state.sendGameCommentLoading = true;
            state.sendGameCommentError = null;
         })
         .addCase(GameCommentHandler.rejected, (state, action) => {
            state.sendGameCommentLoading = true;
            state.sendGameCommentError = action.error.message;
         })
         .addCase(GameCommentHandler.fulfilled, (state, action) => {
            SetGamesCommentHandler(state, action);
         });

      bulder
         .addCase(getSingleGameComments.pending, (state) => {
            state.gameCommentsInfo = null;
            state.gameCommentsLoading = true;
            state.gameCommentsError = null;
         })
         .addCase(getSingleGameComments.rejected, (state, action) => {
            state.gameCommentsInfo = null;
            state.gameCommentsLoading = false;
            state.gameCommentsError = action.error.message;
         })
         .addCase(getSingleGameComments.fulfilled, (state, action) => {
            state.gameCommentsInfo = action.payload.data;
            state.gameCommentsLoading = false;
            state.gameCommentsError = null;
         });

      bulder
         .addCase(likeGameComment.pending, (state) => {
            state.likeCommentLoading = true;
            state.likeCommentError = null;
         })
         .addCase(likeGameComment.rejected, (state, action) => {
            state.likeCommentLoading = false;
            state.likeCommentError = null;
         })
         .addCase(likeGameComment.fulfilled, (state, action) => {
            LikeGameCommentHandler(state, action);
         });

      bulder
         .addCase(SearchGames.pending, (state) => {
            state.gameSearchListsError = null;
         })
         .addCase(SearchGames.rejected, (state, action) => {
            state.gameSearchLists = null;
            state.gameSearchListsError = action.error.message;
         })
         .addCase(SearchGames.fulfilled, (state, action) => {
            state.gameSearchLists = action.payload?.data;
            state.gameSearchListsError = null;
         });

      bulder
         .addCase(getQeuryGames.pending, (state) => {
            state.queryGameLists = null;
            state.queryGameListsLoading = true;
            state.queryGameListsError = null;
         })
         .addCase(getQeuryGames.rejected, (state, action) => {
            state.queryGameLists = null;
            state.queryGameListsLoading = false;
            state.queryGameListsError = action.error.message;
         })
         .addCase(getQeuryGames.fulfilled, (state, action) => {
            state.queryGameLists = action.payload?.data;
            state.queryGameListsLoading = false;
            state.queryGameListsError = null;
         });

      bulder
         .addCase(getRecentPlayGames.pending, (state) => {
            state.recentPlayGamesList = null;
            state.recentPlayGamesListLoading = true;
            state.recentPlayGamesListError = null;
         })
         .addCase(getRecentPlayGames.rejected, (state, action) => {
            state.recentPlayGamesList = null;
            state.recentPlayGamesListLoading = false;
            state.recentPlayGamesListError = action.error.message;
         })
         .addCase(getRecentPlayGames.fulfilled, (state, action) => {
            state.recentPlayGamesList = action.payload?.data;
            state.recentPlayGamesListLoading = false;
            state.recentPlayGamesListError = null;
         });

      bulder
         .addCase(getFavoriteGames.pending, (state) => {
            state.favoriteGamesList = null;
            state.favoriteGamesListLoading = true;
            state.favoriteGamesListError = null;
         })
         .addCase(getFavoriteGames.rejected, (state, action) => {
            state.favoriteGamesList = null;
            state.favoriteGamesListLoading = false;
            state.favoriteGamesListError = action.error.message;
         })
         .addCase(getFavoriteGames.fulfilled, (state, action) => {
            state.favoriteGamesList = action.payload?.data;
            state.favoriteGamesListLoading = false;
            state.favoriteGamesListError = null;
         });

      bulder
         .addCase(deleteSingleRecentGame.pending, (state) => {
            state.deleteRecentGameError = null;
         })
         .addCase(deleteSingleRecentGame.rejected, (state, action) => {
            state.deleteRecentGameError = action.error.message;
         })
         .addCase(deleteSingleRecentGame.fulfilled, (state, action) => {
            state.recentPlayGamesList = {
               ...state.recentPlayGamesList,
               games: [
                  {
                     ...state.recentPlayGamesList?.games[0],
                     gamesList:
                        state.recentPlayGamesList?.games[0]?.gamesList.filter(
                           (el) => el?.gameId !== action.payload?.data?.gameId
                        ),
                  },
               ],
            };
            state.deleteRecentGameError = null;
         });

      bulder
         .addCase(getTopRatedGames.pending, (state) => {
            state.topRatedGames = null;
            state.topRatedGamesLoading = true;
            state.topRatedGamesError = null;
         })
         .addCase(getTopRatedGames.rejected, (state, action) => {
            state.topRatedGames = null;
            state.topRatedGamesLoading = false;
            state.topRatedGamesError = action.error.message;
         })
         .addCase(getTopRatedGames.fulfilled, (state, action) => {
            state.topRatedGames = action.payload?.data;
            state.topRatedGamesLoading = false;
            state.topRatedGamesError = null;
         });

      bulder
         .addCase(getSingleProviderGames.pending, (state) => {
            // state.singleProvider = null;
            state.singleProviderLoading = true;
            state.singleProviderError = null;
         })
         .addCase(getSingleProviderGames.rejected, (state, action) => {
            state.singleProvider = null;
            state.singleProviderLoading = false;
            state.singleProviderError = action.error.message;
         })
         .addCase(getSingleProviderGames.fulfilled, (state, action) => {
            const gamesData = action.payload?.data?.provider[0]?.games;

            state.singleProvider =
               !!state.singleProvider &&
               state.singleProvider?.provider &&
               state.singleProvider?.provider.length
                  ? {
                       ...state.singleProvider,
                       provider: [
                          {
                             ...state.singleProvider?.provider[0],
                             games: state.singleProvider?.provider[0].games.concat(
                                gamesData
                             ),
                          },
                       ],
                    }
                  : action.payload?.data;
            state.singleProviderLoading = false;
            state.singleProviderError = null;
         });

      bulder
         .addCase(getAllGamesLists.pending, (state) => {
            // state.AllGamesInfo = null;
            state.AllGamesInfoLoading = true;
            state.AllGamesInfoError = null;
         })
         .addCase(getAllGamesLists.rejected, (state, action) => {
            state.AllGamesInfo = null;
            state.AllGamesInfoLoading = false;
            state.AllGamesInfoError = action.error.message;
         })
         .addCase(getAllGamesLists.fulfilled, (state, action) => {
            const stateObject = {
               stateKey: 'AllGamesInfo',
               stateLoadingKey: 'AllGamesInfoLoading',
               stateErrorKey: 'AllGamesInfoError',
            };
            SetGamesHandler(state, action, stateObject);
         });

      bulder
         .addCase(getPopularGames.pending, (state) => {
            // state.AllGamesInfo = null;
            state.AllGamesInfoLoading = true;
            state.AllGamesInfoError = null;
         })
         .addCase(getPopularGames.rejected, (state, action) => {
            state.AllGamesInfo = null;
            state.AllGamesInfoLoading = false;
            state.slotsGamesError = action.error.message;
         })
         .addCase(getPopularGames.fulfilled, (state, action) => {
            const stateObject = {
               stateKey: 'AllGamesInfo',
               stateLoadingKey: 'AllGamesInfoLoading',
               stateErrorKey: 'AllGamesInfoError',
            };
            SetGamesHandler(state, action, stateObject);
         });

      bulder
         .addCase(filterByNameGames.pending, (state) => {
            // state.AllGamesInfo = null;
            state.AllGamesInfoLoading = true;
            state.AllGamesInfoError = null;
         })
         .addCase(filterByNameGames.rejected, (state, action) => {
            state.AllGamesInfo = null;
            state.AllGamesInfoLoading = false;
            state.AllGamesInfoError = action.error.message;
         })
         .addCase(filterByNameGames.fulfilled, (state, action) => {
            const stateObject = {
               stateKey: 'AllGamesInfo',
               stateLoadingKey: 'AllGamesInfoLoading',
               stateErrorKey: 'AllGamesInfoError',
            };
            SetGamesHandler(state, action, stateObject);
         });

      bulder
         .addCase(getAllGamesProviersWithGameCounts.pending, (state) => {
            state.gameProviders = null;
            state.gameProvidersLoading = true;
            state.gameProvidersError = null;
         })
         .addCase(
            getAllGamesProviersWithGameCounts.rejected,
            (state, action) => {
               state.gameProviders = null;
               state.gameProvidersLoading = false;
               state.gameProvidersError = action.error.message;
            }
         )
         .addCase(
            getAllGamesProviersWithGameCounts.fulfilled,
            (state, action) => {
               state.gameProviders = action.payload?.data;
               state.gameProvidersLoading = false;
               state.gameProvidersError = null;
            }
         );

      bulder
         .addCase(getSelectedProviderGames.pending, (state) => {
            // state.selectedProviderGames = null;
            state.selectedProviderGamesLoading = true;
            state.selectedProviderGamesError = null;
         })
         .addCase(getSelectedProviderGames.rejected, (state, action) => {
            state.selectedProviderGames = null;
            state.selectedProviderGamesLoading = false;
            state.selectedProviderGamesError = action.error.message;
         })
         .addCase(getSelectedProviderGames.fulfilled, (state, action) => {
            const stateObject = {
               stateKey: 'selectedProviderGames',
               stateLoadingKey: 'selectedProviderGamesLoading',
               stateErrorKey: 'selectedProviderGamesError',
            };
            SetGamesHandler(state, action, stateObject);
         });

      bulder
         .addCase(allGamesLists.pending, (state) => {
            // state.allGamesListsInfo = null;
            // state.allGamesListsLoading = true;
            state.allGamesListsError = null;
         })
         .addCase(allGamesLists.rejected, (state, action) => {
            state.allGamesListsInfo = null;
            state.allGamesListsLoading = false;
            state.allGamesListsError = action.error.message;
         })
         .addCase(allGamesLists.fulfilled, (state, action) => {
            const gamesData = action.payload?.data;

            if (
               state?.allGamesListsInfo?.success &&
               state?.allGamesListsInfo?.games.length
            ) {
               state.allGamesListsLoading = false;
               state.allGamesListsError = null;
               state.allGamesListsInfo = {
                  ...state.allGamesListsInfo,
                  totalPages: gamesData?.totalPages,
                  page: gamesData?.page,
                  totalDocuments: gamesData?.totalDocuments,
                  games: state?.allGamesListsInfo?.games.concat(
                     gamesData?.games
                  ),
               };
            } else {
               state.allGamesListsInfo = action.payload?.data;
               state.allGamesListsLoading = false;
               state.allGamesListsError = null;
            }
         });

      bulder
         .addCase(getNewReleasesGames.pending, (state) => {
            // state.allGamesListsInfo = null;
            // state.allGamesListsLoading = true;
            state.allGamesListsError = null;
            state.loadMoreLoading = true;
         })
         .addCase(getNewReleasesGames.rejected, (state, action) => {
            state.allGamesListsInfo = null;
            state.allGamesListsLoading = false;
            state.allGamesListsError = action.error.message;
            state.loadMoreLoading = false;
         })
         .addCase(getNewReleasesGames.fulfilled, (state, action) => {
            const gamesData = action.payload?.data;
            state.loadMoreLoading = false;

            if (
               state?.allGamesListsInfo?.success &&
               state?.allGamesListsInfo?.games.length
            ) {
               state.allGamesListsLoading = false;
               state.allGamesListsError = null;
               state.allGamesListsInfo = {
                  ...state.allGamesListsInfo,
                  totalPages: gamesData?.totalPages,
                  page: gamesData?.page,
                  totalDocuments: gamesData?.totalDocuments,
                  games: state?.allGamesListsInfo?.games.concat(
                     gamesData?.games
                  ),
               };
            } else {
               state.allGamesListsInfo = action.payload?.data;
               state.allGamesListsLoading = false;
               state.allGamesListsError = null;
            }
         });
   },
});

export const {
   removeProviderGamesInfo,
   removeAllGamesinfo,
   removeProvidersGames,
   removeAllGames,
   userLogOut,
} = gameSlice.actions;

export default gameSlice.reducer;
