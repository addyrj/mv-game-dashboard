import { createSlice } from '@reduxjs/toolkit';
import { login } from './authActions';

const INITAL_STATE = {
   auth: null,
   authLoading: false,
   authError: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState: INITAL_STATE,
   reducers: {
      setLoginUser: (state, action) => {
         state.auth = {
            error: false,
            success: true,
            user: action.payload?.auth,
         };
      },
      logOut: (state) => {
         state.auth = null;
         state.authLoading = false;
         state.authError = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(login.pending, (state) => {
            state.auth = null;
            state.authLoading = true;
            state.authError = null;
         })
         .addCase(login.rejected, (state, action) => {
            state.auth = null;
            state.authLoading = false;
            state.authError = action.error.message;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.auth = action.payload.data;
            state.authLoading = false;
            state.authError = null;
         });
   },
});

export const { setLoginUser, logOut } = authSlice.actions;

export default authSlice.reducer;
