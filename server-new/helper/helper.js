const AWS = require('aws-sdk');
const multer = require('multer');
const winston = require('winston');
const CaptureError = require('../error');
const { default: mongoose } = require('mongoose');
const { default: axios } = require('axios');

const catchAsync = function (fn) {
   /**
    * @fn function which is wrapperd by the catchAsync function to use the DRY method.
    * passdown the request, response and the next argumens into the innerfunction.
    */

   return (req, res, next) => {
      fn(req, res, next).catch((err) => {
         throw new CaptureError('oh ho!', err);
      });
   };
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
         file.mimetype === 'image/avif'
      ) {
         done(null, true);
      } else {
         //prevent the upload
         var newError = new Error('File type is incorrect');
         newError.name = 'MulterError';
         done(newError, false);
      }
   },
});

const logger = winston.createLogger({
   level: 'error', // log only errors and above
   transports: [
      new winston.transports.File({
         filename: './logs/error.log', // filename for the error log file
         format: winston.format.combine(
            winston.format.timestamp(), // add timestamp to each log entry
            winston.format.simple('db'),
            winston.format.json() // log entries in JSON format
         ),
      }),
   ],
});

if (process.env.NODE_ENV !== 'production') {
   logger.add(
      new winston.transports.Console({
         format: winston.format.simple(),
      })
   );
}

// Middleware function to log errors
function logErrors(err, req, res, next) {
   logger.error(err); // log the error stack trace
}

const checkIsValidId = function (string, res) {
   const isValidId = mongoose.isValidObjectId(string);
   return isValidId;
};

const currencyConverion = async function (from, to, amount) {
   const url = `/convert?from=${from}&to=${to}&amount=${amount}`;

   // let currencyConverter = new CC({
   //    from: from,
   //    to: to,
   //    amount: +amount,
   // });

   // const convertRate = await currencyConverter.convert();

   // if (!convertRate) {
   //    throw new Error('Something worng with currency convert api');
   // }

   // return convertRate;

   // get the user selected view currency.
   // once the user selected view currency grab then check the conversion rate.
   const conversionRate = await axios.get(
      `${process.env.CURRENCY_CONVERSION_API + url}`
   );

   return conversionRate;
};

module.exports = {
   catchAsync,
   httpStatusCodes,
   uploadToS3,
   upload,
   logErrors,
   checkIsValidId,
   currencyConverion,
};
