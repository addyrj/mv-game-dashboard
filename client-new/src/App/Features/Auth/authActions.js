import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuthInstance } from '../../../Services/AxiosInstance';

export const signUp = createAsyncThunk(
   'auth/signUp',
   async (data, { rejectWithValue }) => {
      try {
         const signUpUserResponse = await axiosAuthInstance.post(
            `/auth/signUp`,
            data,
            {
               validateStatus: false,
            }
         );

         if (!!signUpUserResponse?.data?.otp_token) {
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000 * 36000;
            now.setTime(expireTime);

            document.cookie =
               'account_varification=false;expires=' +
               now.toUTCString() +
               ';path=/';
            document.cookie = `otp_access_token=${signUpUserResponse?.data?.otp_token}`;
         }

         return signUpUserResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const verifyOtp = createAsyncThunk(
   'auth/varifyOtp',
   async ({ otp, token }, { rejectWithValue }) => {
      try {
         const varifyOtpResponse = await axiosAuthInstance.post(
            '/auth/varify-otp',
            {
               otp,
            },
            {
               validateStatus: false,
               headers: {
                  Authorization: `Bearer ${token}`,
                  varification: 'otp',
               },
            }
         );

         if (
            varifyOtpResponse?.data &&
            varifyOtpResponse?.data?.accessToken &&
            varifyOtpResponse?.data?.refreshToken &&
            varifyOtpResponse?.data?.user
         ) {
            document.cookie = `_mv_games_access_token=${varifyOtpResponse?.data?.accessToken}`;
            document.cookie = `_mv_games_refresh_token=${varifyOtpResponse?.data?.refreshToken}`;
            document.cookie = `_mv_games_auth=${JSON.stringify(
               varifyOtpResponse?.data?.user
            )}`;
            document.cookie = `otp_access_token=false;max-age=0`;
            document.cookie = `account_varification=false;max-age=0`;
         }

         return varifyOtpResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const resendOtp = createAsyncThunk(
   'auth/resendOtp',
   async ({ _id, userId, email }, { rejectWithValue }) => {
      try {
         const resendOtpResponse = await axiosAuthInstance.post(
            '/auth/resend-otp',
            { _id, userId, email }
         );

         if (!!resendOtpResponse?.data?.otp_token) {
            document.cookie = `otp_access_token=${resendOtpResponse?.data?.otp_token}`;
         }

         return resendOtpResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const signIn = createAsyncThunk(
   'auth/signIn',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const signInUserResponse = await axiosAuthInstance.get(
            `/auth/signIn?email=${email}&password=${password}`
         );

         if (signInUserResponse?.data?.otp_token) {
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000 * 36000;
            now.setTime(expireTime);

            document.cookie =
               'account_varification=false;expires=' +
               now.toUTCString() +
               ';path=/';
            document.cookie = `otp_access_token=${signInUserResponse?.data?.otp_token}`;
         }

         if (
            signInUserResponse?.data &&
            signInUserResponse?.data?.accessToken &&
            signInUserResponse?.data?.refreshToken &&
            signInUserResponse?.data?.user
         ) {
            document.cookie = `_mv_games_access_token=${signInUserResponse?.data?.accessToken}`;
            document.cookie = `_mv_games_refresh_token=${signInUserResponse?.data?.refreshToken}`;
            document.cookie = `_mv_games_auth=${JSON.stringify(
               signInUserResponse?.data?.user
            )}`;
            window.history.pushState(
               {},
               document.title,
               window.location.pathname
            );
         }
         return signInUserResponse;
      } catch (err) {
         if (err) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const signUpWithGoogle = createAsyncThunk(
   'auth/signUpWithGoogle',
   async (data, { rejectWithValue }) => {
      try {
         const signUpWithGoogleResponse = await axiosAuthInstance.post(
            `/auth/signUp-with-google`,
            data
         );
         if (
            signUpWithGoogleResponse?.data &&
            signUpWithGoogleResponse?.data?.accessToken &&
            signUpWithGoogleResponse?.data?.refreshToken &&
            signUpWithGoogleResponse?.data?.auth
         ) {
            document.cookie = `_mv_games_access_token=${signUpWithGoogleResponse?.data?.accessToken}`;
            document.cookie = `_mv_games_refresh_token=${signUpWithGoogleResponse?.data?.refreshToken}`;
            document.cookie = `_mv_games_auth=${JSON.stringify(
               signUpWithGoogleResponse?.data?.user
            )}`;
            window.history.pushState(
               {},
               document.title,
               window.location.pathname
            );

            return signUpWithGoogleResponse;
         }
      } catch (err) {
         if (err) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const signInWithMetaMask = createAsyncThunk(
   'auth/signInWithMetaMask',
   async ({ data }, { rejectWithValue }) => {
      try {
         const response = await axiosAuthInstance.post(
            `/auth/signIn-with-meta-mask`,
            data
         );
         if (
            response?.data &&
            response?.data?.accessToken &&
            response?.data?.refreshToken &&
            response?.data?.auth
         ) {
            document.cookie = `_mv_games_access_token=${response?.data?.accessToken}`;
            document.cookie = `_mv_games_refresh_token=${response?.data?.refreshToken}`;
            document.cookie = `_mv_games_auth=${JSON.stringify(
               response?.data?.user
            )}`;
            window.history.pushState(
               {},
               document.title,
               window.location.pathname
            );

            return response;
         }
      } catch (err) {
         if (err) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const forgetPassword = createAsyncThunk(
   'auth/forgetPassword',
   async (data, { rejectWithValue }) => {
      try {
         const forgetPasswordRespose = await axiosAuthInstance.post(
            '/auth/forget-password',
            data
         );

         if (
            forgetPasswordRespose?.data &&
            forgetPasswordRespose?.data?.success
         ) {
            document.cookie = `_rq_password_token=${forgetPasswordRespose?.data?._rq_password_token}`;
            return forgetPasswordRespose;
         }
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const resetPassword = createAsyncThunk(
   'auth/resetPassword',
   async ({ password }, { rejectWithValue }) => {
      try {
         const cookieObj = new URLSearchParams(
            document.cookie.replaceAll('&', '%26').replaceAll('; ', '&')
         );
         const resetPasswordToken = cookieObj.get('_rq_password_token');

         const resetPasswordResponse = await axiosAuthInstance.patch(
            '/auth/reset-password',
            { password },
            {
               validateStatus: false,
               headers: { Authorization: `Bearer ${resetPasswordToken}` },
            }
         );

         if (resetPasswordResponse?.data?.status === 201) {
            document.cookie = `_rq_password_token=false;max-age=0`;
         }
         return resetPasswordResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
