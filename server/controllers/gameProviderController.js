const gameProviderModel = require('../model/schema/gameProvidersSchema');
const gameModel = require('../model/schema/gameSchema');
const {addActivity} = require('../helper/activityHandler');
const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const { default: mongoose } = require('mongoose');

const getAllGameProviders = catchAsync(async function (req, res, next) {
   const { page } = req.query;
   const DOCUMENT_LIMIT = 30;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'page number is required',
      });
   }

   const documentCount = await gameProviderModel.countDocuments();

   const findAllGamesProviders = await gameProviderModel
      .find({}, { games: 0 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findAllGamesProviders) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         providers: findAllGamesProviders,
      });
   }
   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getSingleGameProvider = catchAsync(async function (req, res, next) {
   const { gameProviderId } = req.query;

   if (!gameProviderId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'Game provider id is required',
      });
   }

   const gameProvider = await gameProviderModel.findOne({ _id: gameProviderId }, { games: 0, createdAt: 0 });

   if (gameProvider) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         provider: gameProvider,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const createNewGameProvider = catchAsync(async function (req, res, next) {
   const { providerName, email, phoneNumber, description, status } = req.body;

   if (!providerName && !email) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: false,
         message: 'Provider name and provider email is required',
      });
   }

   // check provider name is already used
   const findProvierName = await gameProviderModel.findOne({ providerName });

   if (findProvierName) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Provider name is already exists',
      });
   }

   // check provider email is already used
   const findProvierEmail = await gameProviderModel.findOne({ email });

   if (findProvierEmail) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Provider email is already exists',
      });
   }

   const insertObject = {
      providerName,
      email,
      phoneNumber,
      description,
      status,
   };

   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      insertObject.logo = uploadData.Location;
   }

   const storeProviderDetails = await gameProviderModel(insertObject).save();

   if (storeProviderDetails) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'new game provider',
         action: `admin created a new game provider`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Game provider saved',
      });
   }
});

const updateGameProvider = catchAsync(async function (req, res, next) {
   const { providerName, email, phoneNumber, description, status, _id, profileTag } = req.body;

   if (!providerName && !email) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: false,
         message: 'Provider name and provider email is required',
      });
   }

   // check provider is exists or not.
   const findDocument = await gameProviderModel.findOne({ _id });

   if (!findDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game provider is not exists',
      });
   }

   if (findDocument?.providerName !== providerName) {
      // check provider name is already used
      const findProvierName = await gameProviderModel.findOne({
         providerName,
      });

      if (findProvierName) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: true,
            message: 'Provider name is already exists',
         });
      }
   }

   if (findDocument?.email !== email) {
      // check provider email is already used
      const findProvierEmail = await gameProviderModel.findOne({ email });

      if (findProvierEmail) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: true,
            message: 'Provider email is already exists',
         });
      }
   }

   const updateObject = {
      providerName,
      email,
      phoneNumber,
      description,
      status,
      profileTag,
   };

   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      updateObject.logo = uploadData.Location;
   }

   // update game provider collection document
   const updateGameProvider = await gameProviderModel.updateOne(
      { _id },
      {
         $set: updateObject,
      }
   );

   if (!!updateGameProvider?.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'update game provider',
         action: `updated a new game provider`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game provider updated',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const blockSingleGameProvider = catchAsync(async function (req, res, next) {
   const { providerId } = req.body;

   if (!providerId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: 'Provider id is required',
      });
   }

   // find the provider document.
   const blockProviderAccount = await gameProviderModel.updateOne(
      {
         _id: providerId,
      },
      { $set: { status: 'Blocked' } }
   );

   if (blockProviderAccount?.modifiedCount) {
      await gameModel.updateMany(
         {
            gameProvider: providerId,
         },
         { $set: { gameStatus: 'Blocked' } }
      );

      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'block game provider',
         action: `admin blocked single game provider`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game provider account blocked!',
         providerId,
         gameStatus: 'Blocked',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const unblockSingleGameProvider = catchAsync(async function (req, res, next) {
   const { providerId } = req.body;

   if (!providerId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: 'Provider id is required',
      });
   }

   // find the provider document.
   const unblockProviderAccount = await gameProviderModel.updateOne(
      {
         _id: providerId,
      },
      { $set: { status: 'Publish' } }
   );

   if (unblockProviderAccount?.modifiedCount) {
      await gameModel.updateMany(
         {
            gameProvider: providerId,
         },
         { $set: { gameStatus: 'Publish' } }
      );

      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'unblock game provider',
         action: `admin unblock single game provider`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game provider account unblocked',
         providerId,
         gameStatus: 'Publish',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const getProvidersGames = catchAsync(async function (req, res, next) {
   const { page, providerId } = req.query;

   if (!page || !providerId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Invalid inputs',
      });
   }

   const DOCUMENT_LIMIT = 50;

   const documentCount = await gameProviderModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(providerId) } },
      {
         $addFields: {
            totalGames: { $size: '$games' },
         },
      },
      {
         $project: {
            totalGames: 1,
         },
      },
   ]);

   const totalGames = documentCount?.[0]?.totalGames;

   const findProviderGames = await gameProviderModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(providerId) } },
      {
         $addFields: {
            totalGames: { $size: '$games' },
         },
      },
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
         $unwind: {
            path: '$games.game',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $project: {
            _id: 1,
            logo: 1,
            providerName: 1,
            description: 1,
            totalGames: 1,
            email: 1,
            'games._id': 1,
            'games.createdAt': 1,
            'games.game.name': 1,
            'games.game.gameImage': 1,
            'games.game.gameStatus': 1,
            'games.game._id': 1,
         },
      },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $group: {
            _id: {
               _id: '$_id',
               providerName: '$providerName',
               logo: '$logo',
               totalGames: '$totalGames',
               description: '$description',
               email: '$email',
            },
            games: {
               $push: '$games',
            },
         },
      },
   ]);

   if (findProviderGames) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(totalGames / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: totalGames,
         provider: findProviderGames,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'game providers not found!',
   });
});

module.exports = {
   getAllGameProviders,
   getSingleGameProvider,
   createNewGameProvider,
   updateGameProvider,
   blockSingleGameProvider,
   unblockSingleGameProvider,
   getProvidersGames,
};
