import { createSlice } from '@reduxjs/toolkit';
import {
   signUp,
   signIn,
   verifyOtp,
   resendOtp,
   signUpWithGoogle,
   forgetPassword,
   resetPassword,
   signInWithMetaMask,
} from './authActions';

const INITAL_STATE = {
   auth: null,
   authLoading: false,
   authFetchError: null,
   invalidAuthErrors: null,
   otpError: null,
   forgetPasswordInfo: null,
   forgetPasswordLoading: false,
   forgetPasswordFetchError: null,
   resetPasswordInfo: null,
   resetPasswordLoading: false,
   resetPasswordFetchError: null,
   signUpInfo: null,
   signUpLoading: false,
   signUpError: null,
   resendOtpInfo: null,
   resendOtpLoading: false,
   resendOtpError: null,
   showOtpVarificationPopup: false,
   showOtpVarificationNotification: false,
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
      removeAuthInfo: (state) => {
         state.auth = null;
      },
      logOut: (state) => {
         state.auth = null;
         state.signUpInfo = null;
         state.showOtpVarificationNotification = false;
      },
      removeSignUpError: (state) => {
         state.signUpInfo = null;
         state.signUpError = null;
      },
      removeOtpInfo: (state) => {
         state.resendOtpInfo = null;
      },
      showOtpPopupHandler: (state, action) => {
         state.showOtpVarificationPopup = action.payload.data;
      },
      removeAuthErrorHandler: (state) => {
         state.authFetchError = null;
      },
      otpVarificationShowHandler: (state, action) => {
         state.showOtpVarificationNotification = action.payload?.data;
      },
      removeOtpErrors: (state) => {
         state.otpError = null;
      },
      updateUserInfo: (state, action) => {
         state.auth = {
            ...state.auth,
            user: {
               ...state?.auth?.user,
               ...action?.payload?.data,
            },
         };
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(signUp.pending, (state) => {
            state.signUpInfo = null;
            state.signUpLoading = true;
            state.signUpError = null;
         })
         .addCase(signUp.rejected, (state, action) => {
            state.signUpInfo = null;
            state.signUpLoading = false;
            state.signUpError = action.error.message;
         })
         .addCase(signUp.fulfilled, (state, action) => {
            state.signUpInfo = action.payload?.data;
            state.signUpLoading = false;
            state.signUpError = null;
         });

      builder
         .addCase(verifyOtp.pending, (state) => {
            state.auth = null;
            state.authLoading = true;
            state.authFetchError = null;
         })
         .addCase(verifyOtp.rejected, (state, action) => {
            state.auth = null;
            state.authLoading = false;
            state.authFetchError = action.error.message;
         })
         .addCase(verifyOtp.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 400) {
               state.authFetchError = action.payload?.data?.message;
               state.authLoading = false;
               state.otpError = action.payload?.data?.message;
            } else {
               state.auth = action.payload?.data;
               state.authLoading = false;
               state.authFetchError = null;
            }
         });

      builder
         .addCase(resendOtp.pending, (state) => {
            state.resendOtpInfo = null;
            state.resendOtpLoading = true;
            state.resendOtpError = null;
         })
         .addCase(resendOtp.rejected, (state, action) => {
            state.resendOtpInfo = null;
            state.resendOtpLoading = false;
            state.resendOtpError = action.error.message;
         })
         .addCase(resendOtp.fulfilled, (state, action) => {
            state.resendOtpInfo = action.payload?.data;
            state.resendOtpLoading = false;
            state.resendOtpError = null;
         });

      builder
         .addCase(signIn.pending, (state) => {
            state.auth = null;
            state.authLoading = true;
            state.authFetchError = null;
         })
         .addCase(signIn.rejected, (state, action) => {
            state.auth = null;
            state.authLoading = false;
            state.authFetchError = action.error;
         })
         .addCase(signIn.fulfilled, (state, action) => {
            if (action.payload?.data?.otpRespose) {
               state.authFetchError = action.payload?.data;
               state.authLoading = false;
               state.auth = null;
            } else {
               state.auth = action.payload.data;
               state.authLoading = false;
               state.authFetchError = null;
            }
         });

      builder
         .addCase(signUpWithGoogle.pending, (state) => {
            state.auth = null;
            state.authLoading = true;
            state.authFetchError = null;
         })
         .addCase(signUpWithGoogle.rejected, (state, action) => {
            state.auth = null;
            state.authLoading = false;
            state.authFetchError = action.error;
         })
         .addCase(signUpWithGoogle.fulfilled, (state, action) => {
            state.auth = action.payload.data;
            state.authLoading = false;
            state.authFetchError = null;
         });

      builder
         .addCase(signInWithMetaMask.pending, (state) => {
            state.auth = null;
            state.authLoading = true;
            state.authFetchError = null;
         })
         .addCase(signInWithMetaMask.rejected, (state, action) => {
            state.auth = null;
            state.authLoading = false;
            state.authFetchError = action.error;
         })
         .addCase(signInWithMetaMask.fulfilled, (state, action) => {
            state.auth = action.payload.data;
            state.authLoading = false;
            state.authFetchError = null;
         });

      builder
         .addCase(forgetPassword.pending, (state) => {
            state.forgetPasswordInfo = null;
            state.forgetPasswordLoading = true;
            state.forgetPasswordFetchError = null;
         })
         .addCase(forgetPassword.rejected, (state, action) => {
            state.forgetPasswordInfo = null;
            state.forgetPasswordLoading = false;
            state.forgetPasswordFetchError = action.error.message;
         })
         .addCase(forgetPassword.fulfilled, (state, action) => {
            state.forgetPasswordInfo = action.payload.data;
            state.forgetPasswordLoading = false;
            state.forgetPasswordFetchError = null;
         });

      builder
         .addCase(resetPassword.pending, (state) => {
            state.resetPasswordInfo = null;
            state.resetPasswordLoading = true;
            state.resetPasswordFetchError = null;
         })
         .addCase(resetPassword.rejected, (state, action) => {
            state.resetPasswordInfo = null;
            state.resetPasswordLoading = false;
            state.resetPasswordFetchError = action.error.message;
         })
         .addCase(resetPassword.fulfilled, (state, action) => {
            if (
               action.payload?.data?.status === 401 ||
               action.payload?.data?.status === 406
            ) {
               state.resetPasswordFetchError = action.payload?.data;
               state.resetPasswordLoading = false;
               state.resetPasswordInfo = null;
            } else {
               state.resetPasswordInfo = action.payload?.data;
               state.resetPasswordLoading = false;
               state.resetPasswordFetchError = null;
            }
         });
   },
});

export const {
   setLoginUser,
   logOut,
   removeOtpInfo,
   showOtpPopupHandler,
   removeAuthErrorHandler,
   otpVarificationShowHandler,
   removeOtpErrors,
   removeSignUpError,
   updateUserInfo,
   removeAuthInfo,
} = authSlice.actions;

export default authSlice.reducer;
