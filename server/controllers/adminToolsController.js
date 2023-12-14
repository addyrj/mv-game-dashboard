const { catchAsync, httpStatusCodes, S3 } = require('../helper/helper');
const gameModel = require('../model/schema/gameSchema');
const dns = require('dns').promises;
const gameCategoriesModel = require('../model/schema/gameCategorySchema');
const gameProvidersModel = require('../model/schema/gameProvidersSchema');

/**
 *
 * @param {fileKey} string file key. upload database json file in s3 and send back the
 * download link to the client.
 */
// const uploadFileInS3 = function (fileKey, findAllData, res) {
//    // s3 config object.
//    const params = {
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: fileKey,
//       Body: JSON.stringify(findAllData, null, 2),
//    };

//    // upload database json object in s3 storage.
//    S3.upload(params, function (s3Err, data) {
//       if (s3Err) throw s3Err;

//       // success upload object info.
//       console.log(`File uploaded successfully at ${data.Location}`);

//       // get object from s3 config.
//       const options = {
//          Bucket: process.env.S3_BUCKET_NAME,
//          Key: fileKey,
//       };

//       S3.getObject(options, function (err, data) {
//          if (err) {
//             res.status(200);
//             res.end('Error Fetching File');
//          } else {
//             res.attachment(options.Key); // Set Filename
//             res.type(data.ContentType); // Set FileType
//             res.send(data.Body.toString()); // Send File json object.
//          }
//       });
//    });
// };

const exportGameCollectionNoPopulateData = catchAsync(async function (
   req,
   res,
   next
) {
   // find game updated data from database.
   const findAllData = await gameModel.find(
      {},
      {
         favorites: 0,
         likes: 0,
         previewImages: 0,
         comments: 0,
         gameProvider: 0,
         gameCategory: 0,
      }
   );

   if (findAllData) {
      const fileName = `game-data.json`;
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.status(httpStatusCodes.OK);
      res.send(findAllData);
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         error: true,
         message: 'Internal server error',
      });
   }
});

const exportGameAllData = catchAsync(async function (req, res, next) {
   const gameData = await gameModel.aggregate([
      {
         $lookup: {
            from: 'gameproviders',
            localField: 'gameProvider',
            foreignField: '_id',
            as: 'gameproviders',
         },
      },
      {
         $lookup: {
            from: 'gamecategories',
            localField: 'gameCategory',
            foreignField: '_id',
            as: 'gameCategory',
         },
      },
      {
         $project: {
            _id: 1,
            name: 1,
            by: 1,
            description: 1,
            aboutGame: 1,
            gameImage: 1,
            gameProvider: 1,
            url: 1,
            __v: 1,
            gameStatus: 1,
            gameproviders: {
               $arrayElemAt: ['$gameproviders', 0],
            },
            gameCategory: {
               $arrayElemAt: ['$gameCategory', 0],
            },
         },
      },
      {
         $project: {
            _id: 1,
            name: 1,
            by: 1,
            __v: 1,
            description: 1,
            aboutGame: 1,
            gameImage: 1,
            gameProvider: 1,
            url: 1,
            gameStatus: 1,
            gameproviders: 1,
            gameCategory: {
               _id: 1,
               name: 1,
               description: 1,
               status: 1,
               createdAt: 1,
               __v: 1,
            },
         },
      },
   ]);

   if (gameData) {
      const fileName = `game-populate-data.json`;
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.status(httpStatusCodes.OK);
      res.send(gameData);
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         error: true,
         message: 'Internal server error',
      });
   }
});

const getCollectionDataWithCategoryList = catchAsync(async function (
   req,
   res,
   next
) {
   const document = await gameCategoriesModel.aggregate([
      {
         $lookup: {
            from: 'games',
            localField: 'games.gameId',
            foreignField: '_id',
            as: 'games.game',
         },
      },
      {
         $project: {
            _id: 1,
            name: 1,
            description: 1,
            status: 1,
            createdAt: 1,
            __v: 1,
            'games.game._id': 1,
            'games.game.name': 1,
            'games.game.by': 1,
            'games.game.description': 1,
            'games.game.aboutGame': 1,
            'games.game.gameImage': 1,
            'games.game.gameProvider': 1,
            'games.game.url': 1,
            'games.game.gameStatus': 1,
            'games.game.__v': 1,
         },
      },
   ]);

   if (document) {
      const fileName = `game-category-data.json`;
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.status(httpStatusCodes.OK);
      res.send(document);
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         error: true,
         message: 'Internal server error',
      });
   }
});

const getAllProvidersData = catchAsync(async function (req, res, next) {
   const findProviderData = await gameProvidersModel.aggregate([
      {
         $unwind: {
            path: '$games',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $lookup: {
            from: 'games',
            localField: 'games.gameId',
            foreignField: '_id',
            as: 'games.game',
         },
      },
      {
         $lookup: {
            from: 'gamecategories',
            localField: 'games.game.gameCategory',
            foreignField: '_id',
            as: 'games.gameCategory',
         },
      },
      {
         $project: {
            _id: 1,
            providerName: 1,
            email: 1,
            phoneNumber: 1,
            description: 1,
            logo: 1,
            __v: 1,
            status: 1,
            games: {
               _id: 1,
               createdAt: 1,
               game: {
                  _id: 1,
                  name: 1,
                  by: 1,
                  description: 1,
                  aboutGame: 1,
                  url: 1,
                  gameStatus: 1,
                  createdAt: 1,
                  gameImage: 1,
                  __v: 1,
               },
               gameCategory: {
                  _id: 1,
                  name: 1,
                  description: 1,
                  status: 1,
                  createdAt: 1,
                  __v: 1,
               },
            },
         },
      },
      {
         $project: {
            _id: 1,
            providerName: 1,
            email: 1,
            phoneNumber: 1,
            description: 1,
            logo: 1,
            __v: 1,
            status: 1,
            'games.game': {
               $arrayElemAt: ['$games.game', 0],
            },
            'games.gameCategory': {
               $arrayElemAt: ['$games.gameCategory', 0],
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               providerName: '$providerName',
               email: '$email',
               phoneNumber: '$phoneNumber',
               description: '$description',
               logo: '$logo',
               __v: '$__v',
               status: '$status',
            },
            games: {
               $push: '$games',
            },
         },
      },
   ]);

   if (findProviderData) {
      const fileName = `providers-games.json`;
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.status(httpStatusCodes.OK);
      res.send(findProviderData);
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         error: true,
         message: 'Internal server error',
      });
   }
});

module.exports = {
   exportGameCollectionNoPopulateData,
   exportGameAllData,
   getCollectionDataWithCategoryList,
   getAllProvidersData,
};
