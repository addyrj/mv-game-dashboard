const { catchAsync, httpStatusCodes, uploadToS3, checkIsValidId } = require('../helper/helper');
const { default: mongoose } = require('mongoose');

const currencyModel = require('../model/schema/currencySchema');
const roleModel = require('../model/schema/roleSchema');
const gameModel = require('../model/schema/gameSchema');
const gameProviderModel = require('../model/schema/gameProvidersSchema');
const avatarModel = require('../model/schema/avatarSchema');
const authModel = require('../model/schema/authSchema');
const gameCategoryModel = require('../model/schema/gameCategorySchema');

const getUsersAvatars = catchAsync(async function (req, res, next) {
   const findAllAvatar = await avatarModel.find({}).sort({ createdAt: -1 });

   if (findAllAvatar) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         avatars: findAllAvatar,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

const insertGameAvatar = catchAsync(async function (req, res, next) {
   const { description } = req.body;

   const uploadObject = {
      description,
   };

   // if user send the file then wait for the s3 upload.
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      uploadObject.url = uploadData.Location;
   }

   const uploadAvatar = await avatarModel(uploadObject).save();

   if (uploadAvatar) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Avatar uploded',
         avatar: uploadAvatar,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const deleteSingleAvatar = catchAsync(async function (req, res, next) {
   const { avatarId } = req.query;

   if (!avatarId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         message: 'Avatar id is reuqired',
      });
   }

   const findAndDelete = await avatarModel.deleteOne({ _id: avatarId });

   if (!!findAndDelete.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         id: avatarId,
         message: 'Avatar deleted',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getAllUsers = catchAsync(async function (req, res, next) {
   const { page } = req.query;
   const DOCUMENT_LIMIT = 30;
   const documentCount = await authModel.countDocuments();

   const findDocuments = await authModel
      .find(
         {},
         {
            password: 0,
            wallet: 0,
            userRole: 0,
            otp: 0,
            friendRequests: 0,
            addFriendRequests: 0,
            friends: 0,
            blockedUsers: 0,
            likes: 0,
            medals: 0,
         }
      )
      .sort({ createdAt: -1 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         users: findDocuments,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const getGamesUploadResult = catchAsync(async function (req, res, next) {
   const countDocuments = await gameModel.countDocuments();

   const findGamesdata = await gameModel.aggregate([
      {
         $group: {
            _id: {
               $dateToString: {
                  format: '%d %m %Y',
                  date: '$createdAt',
               },
            },
            games: { $sum: 1 },
         },
      },
      { $sort: { _id: 1 } },
   ]);

   if (findGamesdata) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         result: findGamesdata,
         totalsGames: countDocuments,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const filterGameUploadDataResult = catchAsync(async function (req, res, next) {
   const { filter } = req.query;

   if (!filter || filter === 'undefined' || filter === 'null') {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'filter is required',
      });
   }

   const filterValue = filter.split('%20').join(' ');

   const findGamesdata = await gameModel.aggregate([
      {
         $group: {
            _id: {
               $dateToString: {
                  format: filterValue,
                  date: '$createdAt',
               },
            },
            games: { $sum: 1 },
         },
      },
      { $sort: { _id: 1 } },
   ]);

   if (findGamesdata) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         result: findGamesdata,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Document not found',
   });
});

const getUserLoginResults = catchAsync(async function (req, res, next) {
   const userInfo = await authModel.aggregate([
      {
         $group: {
            _id: {
               $dateToString: {
                  format: '%d %m %Y',
                  date: '$createdAt',
               },
            },
            user: { $sum: 1 },
         },
      },
      { $sort: { _id: 1 } },
   ]);

   if (userInfo) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         result: userInfo,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

module.exports = {
   getUsersAvatars,
   insertGameAvatar,
   deleteSingleAvatar,
   getAllUsers,
   getGamesUploadResult,
   filterGameUploadDataResult,
   getUserLoginResults,
};
