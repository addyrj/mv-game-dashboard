import { createSlice } from '@reduxjs/toolkit';

import {
   createNewGameProvider,
   getAllGameProviders,
   updateGameProvider,
   blockSingleGameProvider,
   getProvidersGames,
} from './GameProvidersActions';

const INITAL_STATE = {
   postNewGameProviderInfo: null,
   postNewGameProviderLoading: false,
   postNewGameProviderError: null,
   postNewGameProviderInvalidErrors: [],
   gameProviders: null,
   gameProvidersLoading: false,
   gameProvidersError: null,
   providerGamesList: null,
   providerGamesLoading: false,
   providerGamesError: null,
};

const gameProvidersSlice = createSlice({
   name: 'gameProviders',
   initialState: INITAL_STATE,
   reducers: {
      removeProviderErros: (state) => {
         state.postNewGameProviderInfo = null;
         state.postNewGameProviderError = null;
         state.postNewGameProviderInvalidErrors = [];
      },
      removeProviderGamesInfo: (state) => {
         state.providerGamesList = null;
         state.providerGamesError = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(createNewGameProvider.pending, (state) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = true;
            state.postNewGameProviderError = null;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(createNewGameProvider.rejected, (state, action) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = false;
            state.postNewGameProviderError = action.error.message;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(createNewGameProvider.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.postNewGameProviderInfo = null;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = action.payload?.data;
            } else {
               state.postNewGameProviderInfo = action.payload?.data;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = [];
            }
         });

      bulder
         .addCase(getAllGameProviders.pending, (state) => {
            state.gameProviders = null;
            state.gameProvidersLoading = true;
            state.gameProvidersError = null;
         })
         .addCase(getAllGameProviders.rejected, (state, action) => {
            state.gameProviders = null;
            state.gameProvidersLoading = false;
            state.gameProvidersError = action.error.message;
         })
         .addCase(getAllGameProviders.fulfilled, (state, action) => {
            state.gameProviders = action.payload?.data;
            state.gameProvidersLoading = false;
            state.gameProvidersError = null;
         });

      bulder
         .addCase(updateGameProvider.pending, (state) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = true;
            state.postNewGameProviderError = null;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(updateGameProvider.rejected, (state, action) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = false;
            state.postNewGameProviderError = action.error.message;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(updateGameProvider.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.postNewGameProviderInfo = null;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = action.payload?.data;
            } else {
               state.postNewGameProviderInfo = action.payload?.data;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = [];
            }
         });

      bulder
         .addCase(blockSingleGameProvider.pending, (state) => {
            state.gameProvidersLoading = true;
            state.gameProvidersError = null;
         })
         .addCase(blockSingleGameProvider.rejected, (state, action) => {
            state.gameProvidersLoading = false;
            state.gameProvidersError = action.error.message;
         })
         .addCase(blockSingleGameProvider.fulfilled, (state, action) => {
            const data = action.payload?.data;

            state.gameProviders = {
               ...state.gameProviders,
               providers:
                  data?.providerId && !!data?.providerId
                     ? state.gameProviders?.providers.map((el) =>
                          el?._id === data?.providerId
                             ? { ...el, status: data?.gameStatus }
                             : el
                       )
                     : state.gameProviders?.providers,
            };
            state.gameProvidersLoading = false;
            state.gameProvidersError = null;
         });

      bulder
         .addCase(getProvidersGames.pending, (state) => {
            // state.providerGamesList = null;
            state.providerGamesLoading = true;
            state.providerGamesError = null;
         })
         .addCase(getProvidersGames.rejected, (state, action) => {
            state.providerGamesList = null;
            state.providerGamesLoading = false;
            state.providerGamesError = action.error.message;
         })
         .addCase(getProvidersGames.fulfilled, (state, action) => {
            const gamesData = action.payload?.data?.provider[0]?.games;

            state.providerGamesList =
               !!state.providerGamesList &&
               state.providerGamesList?.provider &&
               state.providerGamesList?.provider.length
                  ? {
                       ...state.providerGamesList,
                       provider: [
                          {
                             ...state.providerGamesList?.provider[0],
                             games: state.providerGamesList?.provider[0].games.concat(
                                gamesData
                             ),
                          },
                       ],
                    }
                  : action.payload?.data;
            state.providerGamesLoading = false;
            state.providerGamesError = null;
         });
   },
});

export const { removeProviderErros, removeProviderGamesInfo } =
   gameProvidersSlice.actions;

export default gameProvidersSlice.reducer;
