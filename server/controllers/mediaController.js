const {
   catchAsync,
   httpStatusCodes,
   uploadToS3,
   awsConfig,
   comporessImage,
} = require('../helper/helper');
// const mediaModel = require('../model/schema/mediaSchema');
const AWS = require('aws-sdk');
const s3 = new AWS.S3(awsConfig);
const Bucket = process.env.S3_BUCKET_NAME;
const baseUrl = `https://${process.env.S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/`;

const getAllUploadImages = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is reuqired',
      });
   }

   const params = {
      Bucket,
      Prefix: 'bc-games/',
      // MaxKeys: 20, // to create pagination
   };

   s3.listObjects(params, function (err, data) {
      if (err) {
         console.log('s3 list object error: ', err, err.stack);
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            error: true,
            message: 'Internal server error',
         });
      } else {
         const sortData = data.Contents.sort(
            (a, b) => b.LastModified - a.LastModified
         );

         const images = sortData.map((el) => ({ key: baseUrl + el.Key }));

         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            images,
         });
      }
   });
});

const uploadBulkImages = catchAsync(async function (req, res, next) {
   const files = req.files;

   if (!files) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Images is reuqired',
      });
   }

   let isStored = false;
   let imagesUrlAr = [];

   /**
    * loop over the selected images array. store images into the s3 or also in the
    * database. once all the images is successfully upload and store then send back
    * the repose.
    */

   for (let i = 0; i < files.length; i++) {
      const bufferData = await comporessImage(files[i]?.buffer);
      const uploadImageData = await uploadToS3(bufferData);
      const imageUrl = uploadImageData.Location;

      if (imageUrl) {
         imagesUrlAr.push({ key: imageUrl });
         isStored = true;
      } else {
         isStored = false;
         break;
      }

      // const storeImageData = await mediaModel({
      //    imageUrl,
      // }).save();
      // if (storeImageData) {
      //    imagesUrlAr.push({ imageUrl, _id: storeImageData._id });
      //    isStored = true;
      // } else {
      //    isStored = false;
      //    break;
      // }
   }

   if (isStored) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Images uploaded',
         images: imagesUrlAr,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const replaceMediaImage = catchAsync(async function (req, res, next) {
   const file = req.files[0];

   if (!file) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message:
            'Replace image is reuqired. please attached the replace with input and then send to the server.',
      });
   }

   /**
    * @selectedImage image url. which we want to replace with new image and set the replace image
    * url === selectedImage. in the case image will be change but the url is not.
    * first delete the selected image from the s3 bucket. and then upload new image with the same url.
    */

   const { selectedImage } = req.body;
   const splitFileName = selectedImage.split('/');
   const originalName = splitFileName[splitFileName.length - 1];

   s3.deleteObject(
      { Bucket, Key: `bc-games/${originalName}` },
      function (err, data) {
         if (err) {
            console.log('s3 list delete object error: ', err, err.stack);
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               error: true,
               success: false,
               message: err?.message,
            });
         }

         const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `bc-games/${originalName}`,
            Body: file.buffer,
         };

         s3.upload(params, (err, data) => {
            if (err) {
               console.log('s3 list upload object error: ', err, err.stack);
               return res.status(httpStatusCodes.BAD_REQUEST).json({
                  error: true,
                  success: false,
                  message: err?.message,
               });
            }

            return res.status(httpStatusCodes.CREATED).json({
               success: true,
               error: false,
               message: 'Image replaced',
               key: data?.Location,
            });
         });
      }
   );
});

const deleteMediaFiles = catchAsync(async function (req, res, next) {
   const { fileName } = req.query;

   if (!fileName) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Filename is required',
      });
   }

   const splitFileName = fileName.split('/');
   const originalName = splitFileName[splitFileName.length - 1];

   const params = {
      Bucket,
      Key: `bc-games/${originalName}`,
   };

   s3.deleteObject(params, function (err, data) {
      if (err) {
         console.log('s3 list delete object error: ', err, err.stack);
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            error: true,
            success: false,
            message: err?.message,
         });
      }
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         deleteObject: fileName,
      });
   });
});

module.exports = {
   getAllUploadImages,
   uploadBulkImages,
   replaceMediaImage,
   deleteMediaFiles,
};
