import axios from 'axios';
import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';

const getCookieValues = function () {
   const cookieObj = new URLSearchParams(
      document.cookie.replaceAll('&', '%26').replaceAll('; ', '&')
   );

   return cookieObj;
};

const axiosInstance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
});

const getAccessToken = async function () {
   const cookieObj = getCookieValues();
   const refreshToken = cookieObj.get('_mv_games_refresh_token');
   axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
   const accessToken = cookieObj.get('_mv_games_access_token');
   const decodeAccessToken = jwtDecode(accessToken);

   const accessTokenResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/refresh-token?userId=${decodeAccessToken._id}&crUserId=${decodeAccessToken?.userId}`
   );

   if (accessTokenResponse?.data && accessTokenResponse?.data?.success) {
      const token = accessTokenResponse?.data?.accessToken;
      document.cookie = `_mv_games_access_token=${token}`;

      return token;
   }
};

const validTokenRequestMiddleware = async function (req) {
   try {
      const cookieObj = getCookieValues();
      const accessToken = cookieObj.get('_mv_games_access_token');
      const decodeAccessToken = jwtDecode(accessToken);

      if (!(Date.now() >= decodeAccessToken.exp * 1000)) {
         req.headers.Authorization = `Bearer ${accessToken}`;
         return req;
      } else {
         const token = await getAccessToken();
         if (token) {
            req.headers['Authorization'] = `Bearer ${token}`;
         }
         return req;
      }
   } catch (err) {
      return Promise.reject(err);
   }
};

const errorFunction = function (error) {
   const message = error?.response?.data?.message;
   if (message) {
      toast.error(message);
   }
   throw error;
};

axiosInstance.interceptors.request.use(
   async (req) => await validTokenRequestMiddleware(req),
   function (error) {
      Promise.reject(error);
      console.log(error);
   }
);

axiosInstance.interceptors.response.use(
   function (config) {
      return config;
   },
   (err) => errorFunction(err)
);

export const axiosAuthInstance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
   },
});

axiosAuthInstance.interceptors.response.use(
   function (config) {
      return config;
   },
   (err) => errorFunction(err)
);

export const axioClientInstance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
});

axioClientInstance.interceptors.response.use(
   function (config) {
      return config;
   },
   (err) => errorFunction(err)
);

const cryptoPaymentServer = axios.create({
   baseURL: process.env.REACT_APP_CRYPTO_PAYMENT_SERVER,
});

cryptoPaymentServer.interceptors.request.use(
   async (req) => await validTokenRequestMiddleware(req)
);

cryptoPaymentServer.interceptors.response.use(
   async (req) => validTokenRequestMiddleware(req),
   (err) => errorFunction(err)
);

export { cryptoPaymentServer };
export default axiosInstance;
