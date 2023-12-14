const { validationResult } = require('express-validator');
const multer = require('multer');
const AWS = require('aws-sdk');
const sharp = require('sharp');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// genrate access token.
const genrateAccessToken = function (data) {
   const accessToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: '5m',
   });
   return accessToken;
};

// genrate refresh token function
const genrateRefreshToken = function (user) {
   const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: '1y',
   });
   return refreshToken;
};

const catchAsync = function (fn) {
   /**
    * @fn function which is wrapperd by the catchAsync function to use the DRY method.
    * passdown the request, response and the next argumens into the innerfunction.
    */

   return (req, res, next) => {
      fn(req, res, next).catch((err) => {
         console.log(err);
      });
   };
};

const getUserTokenInfromation = function (req) {
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

const httpStatusCodes = {
   OK: 200,
   CREATED: 201,
   ACCEPTED: 202,
   NO_CONTENT: 204,
   PARTIAL_CONTENT: 206,
   NOT_MODIFIED: 304,
   BAD_REQUEST: 400,
   NOT_FOUND: 404,
   INVALID_INPUT: 422,
   NOT_ACCEPTABLE: 406,
   INTERNAL_SERVER: 500,
   UNAUTHORIZATION: 401,
};

const validateErrors = function (req, res, next) {
   /**
    * validate the request
    */
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         error: errors.array(),
         status: httpStatusCodes.INVALID_INPUT,
      });
   }

   next();
};

const awsConfig = {
   accessKeyId: process.env.aws_access_key_id,
   secretAccessKey: process.env.aws_secret_access_key,
   region: process.env.AWS_REGION,
   correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

//upload to s3
const uploadToS3 = (fileData) => {
   return new Promise((resolve, reject) => {
      const params = {
         Bucket: process.env.S3_BUCKET_NAME,
         Key: `bc-games/${Date.now().toString()}.jpg`,
         Body: fileData,
      };
      S3.upload(params, (err, data) => {
         if (err) {
            console.log(err);
            return reject(err);
         }
         return resolve(data);
      });
   });
};

//Specify the multer config
let upload = multer({
   limits: {
      fileSize: 1024 * 1024 * 5,
   },
   fileFilter: function (req, file, done) {
      if (
         file.mimetype === 'image/jpeg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/avif' ||
         file.mimetype === 'image/webp'
      ) {
         done(null, true);
      } else {
         //prevent the upload
         var newError = new Error('File type is incorrect');
         newError.name = 'MulterError';
         console.log(newError);
         done(newError, false);
      }
   },
});

// resize image with sharp
const comporessImage = async (file) => {
   const imageBufferData = await sharp(file).jpeg({ quality: 40 }).toBuffer();
   return imageBufferData;
};

const checkIsValidId = function (string, res) {
   const isValidId = mongoose.isValidObjectId(string);
   return isValidId;
};

// varify user jwt tokens
const jwtRefreshTokenVarification = function (req, res, next) {
   const token = getUserTokenInfromation(req, res);

   if (!!token?.error && !token?.success) {
      return res.status(token?.status).json(token);
   }

   // validate the user token.
   jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
         return res.status(httpStatusCodes.UNAUTHORIZATION).json({
            error: true,
            message: 'Unauthorized',
         });
      }

      next();
   });
};

module.exports = {
   catchAsync,
   httpStatusCodes,
   validateErrors,
   uploadToS3,
   S3,
   upload,
   awsConfig,
   comporessImage,
   checkIsValidId,
   genrateAccessToken,
   genrateRefreshToken,
   jwtRefreshTokenVarification
};
