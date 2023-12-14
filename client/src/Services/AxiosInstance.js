import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_ADMIN_URL });
export const axiosClientInstance = axios.create({ baseURL: process.env.REACT_APP_CLIENT_BACKEND_URL });
export const cryptoPaymentServer = axios.create({ baseURL: process.env.REACT_APP_CRYPTO_PAYMENT_SERVER });

const interceptorsRequestFunction = async function (req) {
   try {
      const refreshToken = localStorage.getItem('_mv_games_refresh_token');
      const accessToken = localStorage.getItem('_mv_games_access_token');

      if (!refreshToken) {
         console.log('login again');
      }

      req.headers['x-admin-api-key'] = process.env.REACT_APP_ADMIN_SECRET_KEY;

      /**
       * get user refresh token.
       * check user has refresh token or not.
       * check the user access token is exipre or not.
       * if the user token is expire then request for the new access token.
       * @return request.
       */

      const decodeAccessToken = jwtDecode(accessToken);

      // if the user token is not expire then send back the request.
      if (!(Date.now() >= decodeAccessToken.exp * 1000)) {
         req.headers.Authorization = `Bearer ${accessToken}`;
         return req;
      } else {
         // request for the new token when the user token is expire.
         axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;

         const accessTokenResponse = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_ADMIN_URL}/auth/refresh-token?userId=${decodeAccessToken._id}`,
            { withCredentials: true }
         );

         if (accessTokenResponse?.data && accessTokenResponse?.data?.success) {
            localStorage.setItem('_mv_games_access_token', accessTokenResponse?.data?.accessToken);

            // set new access token in headers.
            req.headers['Authorization'] = `Bearer ${accessTokenResponse?.data?.accessToken}`;

            return req;
         }
      }
   } catch (err) {
      return Promise.reject(err);
   }
};

const errorFunction = function (error) {
   const msg = error?.response?.data?.message;
   if (msg) {
      message.error(msg);
   }
   throw error;
};

axiosInstance.interceptors.request.use(interceptorsRequestFunction, function (error) {
   Promise.reject(error);
   console.log(error);
});

axiosClientInstance.interceptors.request.use(interceptorsRequestFunction, function (error) {
   Promise.reject(error);
   console.log(error);
});

cryptoPaymentServer.interceptors.request.use(interceptorsRequestFunction);
cryptoPaymentServer.interceptors.response.use(interceptorsRequestFunction, (err) => errorFunction(err));

const successMessage = function (config) {
   const data = config?.data;
   const msg = data?.message;
   if (msg && data?.success) {
      message.success(msg);
   }
};

axiosInstance.interceptors.response.use(
   function (config) {
      successMessage(config);
      return config;
   },
   (err) => errorFunction(err)
);

axiosClientInstance.interceptors.response.use(
   function (config) {
      successMessage(config);
      return config;
   },
   (err) => errorFunction(err)
);

export default axiosInstance;
