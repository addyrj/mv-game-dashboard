import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUserRoles } from '../Admin/adminSlice';

const axiosAuthInstance = axios.create({
   baseURL: process.env.REACT_APP_BACKEND_BASE_ADMIN_URL,
   headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
   },
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue, dispatch }) => {
   try {
      const loginUserInfo = await axiosAuthInstance.post('/auth/login', {
         email,
         password,
      });

      if (
         loginUserInfo?.data &&
         loginUserInfo?.data?.accessToken &&
         loginUserInfo?.data?.refreshToken &&
         loginUserInfo?.data?.user
      ) {
         localStorage.setItem('_mv_games_access_token', loginUserInfo?.data?.accessToken);
         localStorage.setItem('_mv_games_refresh_token', loginUserInfo?.data?.refreshToken);
         localStorage.setItem('_mv_games_auth', JSON.stringify(loginUserInfo?.data?.user));

         const roles = loginUserInfo?.data?.roles;

         if (roles) {
            dispatch(setUserRoles(roles));
         }
      }
      return loginUserInfo;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});
