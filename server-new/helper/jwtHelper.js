const jwt = require('jsonwebtoken');
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
const { httpStatusCodes } = require('./helper');
const GAME_SECRET_TOKEN = process.env.GAME_SECRET_TOKEN;
const API_SCRECT = process.env.API_SCRECT;

// genrate access token.
const genrateAccessToken = function (data) {
   const accessToken = jwt.sign(data, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: '5m',
   });
   return accessToken;
};

// genrate refresh token function
const genrateRefreshToken = function (user) {
   const refreshToken = jwt.sign(user, JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: '1y',
   });
   return refreshToken;
};

const getUserTokenInfromation = function (req) {
   /**
    * @param authToken check user authorization token
    * if the token is expire then send back the 401 error.
    * also check the user has valid token or not.
    */

   const authToken = req.headers['authorization'];

   if (!authToken) {
      return {
         error: true,
         success: false,
         message: 'Unauthrization',
         status: httpStatusCodes.UNAUTHORIZATION,
      };
   }

   const token = authToken.split(' ')[1];

   // if user is not valid then send back the error
   if (!token) {
      return {
         error: true,
         success: false,
         message: 'Unauthrization',
         status: httpStatusCodes.UNAUTHORIZATION,
      };
   }

   return token;
};

// varify user jwt tokens
const jwtRefreshTokenVarification = function (req, res, next) {
   const token = getUserTokenInfromation(req, res);

   if (!!token?.error && !token?.success) {
      return res.status(token?.status).json(token);
   }

   // validate the user token.
   jwt.verify(token, JWT_REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
         return res.status(401).json({
            error: true,
            message: 'Unauthorized',
         });
      }

      next();
   });
};

// varify jwt token.
const varifyJwtToken = function (req, res, next) {
   const headersVarifyData = getUserTokenInfromation(req, res);

   if (!!headersVarifyData?.error && !headersVarifyData?.success) {
      return res.status(headersVarifyData?.status).json(headersVarifyData);
   }

   jwt.verify(headersVarifyData, JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
         const sendObject = {
            error: true,
            message: 'Unauthorized',
            status: httpStatusCodes.UNAUTHORIZATION,
         };

         if (req.headers.varification) {
            sendObject.message = 'Otp expire';
         }

         return res.status(httpStatusCodes.UNAUTHORIZATION).json(sendObject);
      }

      req.userPayload = payload;
      next();
   });
};

// varify user reset password token.
const varifyUserResetPasswordToken = function (req, res, next) {
   // find the token in the headers or not.
   const authToken = req.headers['authorization'];
   const token = authToken.split(' ')[1];

   // if user dont have any token.
   if (token === 'null' || token === 'undefined') {
      return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
         error: true,
         message: 'token is required',
         status: httpStatusCodes.NOT_ACCEPTABLE,
      });
   }

   // if user has token but the token is expire then send back the error respose.
   jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
         return res.status(httpStatusCodes.UNAUTHORIZATION).json({
            error: true,
            message: 'link is expire',
            status: httpStatusCodes.UNAUTHORIZATION,
         });
      }

      req.resetPasswordToken = token;
      next();
   });
};

const varifyGameToken = async function (req, res, next) {
   const token = getUserTokenInfromation(req, res);

   // if user is not valid then send back the error
   if (!!token?.error && !token?.success) {
      return res.status(token?.status).json(token);
   }

   const { secret } = req.query;

   if (!!secret && secret === API_SCRECT) {
      jwt.verify(token, GAME_SECRET_TOKEN, (err, payload) => {
         if (err) {
            return res.status(httpStatusCodes.INVALID_INPUT).json({
               success: false,
               message: 'Invalid user game token',
            });
         }

         const { userId } = payload;

         if (!userId) {
            return res.status(httpStatusCodes.UNAUTHORIZATION).json({
               error: true,
               message: 'Unauthorized',
               status: httpStatusCodes.UNAUTHORIZATION,
            });
         }

         req.userId = payload?.userId;
         req.selectedCurrency = payload?.selectedCurrency;
         req.crSymbol = payload?.crSymbol;
         req.userCrId = payload?.userCrId;
         req.currencyType = payload.currencyType;
         next();
      });
   } else {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         message: 'Invalid user secret key',
      });
   }
};

const validGameScrectKey = function (req, res, next) {
   const { secret } = req.query;

   if (secret && secret === API_SCRECT) {
      next();
   } else {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         message: 'Invalid user secret key',
      });
   }
};

module.exports = {
   genrateAccessToken,
   jwtRefreshTokenVarification,
   genrateRefreshToken,
   varifyJwtToken,
   varifyUserResetPasswordToken,
   getUserTokenInfromation,
   varifyGameToken,
   validGameScrectKey,
};
