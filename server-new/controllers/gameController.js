const {
   catchAsync,
   httpStatusCodes,
   currencyConverion,
} = require('../helper/helper');
const GAME_REFRESH_TOKEN_SCRECT = process.env.GAME_REFRESH_TOKEN_SCRECT;
const jwt = require('jsonwebtoken');
const axios = require('axios');

const authModel = require('../model/schema/authSchema');
const gameModel = require('../model/schema/gameSchema');
const gameProviderModel = require('../model/schema/gameProvidersSchema');
const gameCategoryModel = require('../model/schema/gameCategorySchema');
const userHistoryModel = require('../model/schema/userHistorySchema');
const userSettingModel = require('../model/schema/userSettingSchema');
const userWalletModel = require('../model/schema/walletSchema');

const { default: mongoose } = require('mongoose');
const GAME_SECRET_TOKEN = process.env.GAME_SECRET_TOKEN;
const CRYPTO_SERVER = process.env.CRYPTO_PAYMENT_SERVER;

// genrate game access token
const genrateGameToken = catchAsync(async function (req, res, next) {
   const { userId, selectedCurrency, crSymbol, userCrId, currencyType } =
      req.body;

   const payloadData = {
      userId,
      userCrId,
      currencyType: currencyType || 'fiatCurrency',
   };

   if (selectedCurrency) payloadData.selectedCurrency = selectedCurrency;
   if (crSymbol) payloadData.crSymbol = crSymbol;

   if (!userId) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         message: 'User id is is reuqired',
      });
   }

   const genrateUserGameToken = jwt.sign(payloadData, GAME_SECRET_TOKEN, {
      expiresIn: '30m',
   });

   if (genrateUserGameToken) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         token: genrateUserGameToken,
      });
   }
});

// genrate user refresh token.
const genrateRefreshToken = catchAsync(async function (req, res, next) {
   /**
    * @param authToken check user authorization token
    * if the token is expire then send back the 401 error.
    * also check the user has valid token or not.
    */

   const secret = req.headers['secret'];
   const { userId } = req.body;

   if (!userId) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         message: 'User id is is reuqired',
      });
   }

   if (secret === GAME_REFRESH_TOKEN_SCRECT) {
      const findUserFromDb = await userSettingModel.findOne(
         { userId },
         { selectedCurrency: 1 }
      );

      if (!findUserFromDb) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'User is not exists.',
         });
      }

      const payload = {
         userId,
      };

      const selectedCurrency = findUserFromDb?.selectedCurrency;

      if (
         (!!findUserFromDb &&
            !!selectedCurrency &&
            !!selectedCurrency?.currencyId) ||
         !!selectedCurrency?.crSymbol
      ) {
         if (selectedCurrency?.currencyId) {
            payload.selectedCurrency = selectedCurrency?.currencyId;
         }

         if (selectedCurrency?.crSymbol) {
            payload.crSymbol = selectedCurrency?.crSymbol;
         }
      } else {
         const getCurrencyFromUserWallet = await userWalletModel.findOne(
            {
               userId,
            },
            { userWallet: 1 }
         );

         if (!getCurrencyFromUserWallet) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message:
                  'Someting worng with getting user wallet default currency id.',
            });
         }

         const defaultSelectedCurrency =
            getCurrencyFromUserWallet?.userWallet?.[1]?.currencyId;
         payload.selectedCurrency = defaultSelectedCurrency;
      }

      const genrateUserToken = jwt.sign(payload, GAME_SECRET_TOKEN, {
         expiresIn: '30m',
      });

      if (genrateUserToken) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            token: genrateUserToken,
         });
      }
   }

   return res.status(httpStatusCodes.INVALID_INPUT).json({
      success: false,
      message: 'Invalid user game token',
   });
});

const getGameUserInfo = catchAsync(async function (req, res, next) {
   /**
    * varify the user token.
    * if the user is valid then send back the user information to the client.
    * if user token is invalid then send back error respose.
    */
   const { userId, selectedCurrency, crSymbol, userCrId, currencyType } = req;

   const userSelectedViewCurrency = await userSettingModel.findOne(
      { userId: userId },
      { conversionCurrency: 1 }
   );

   if (selectedCurrency && !!currencyType) {
      const findUserInfo = await authModel.aggregate([
         { $match: { _id: mongoose.Types.ObjectId(userId) } },
         {
            $lookup: {
               from: 'wallets',
               localField: 'walletId',
               foreignField: '_id',
               as: 'wallet',
            },
         },
         { $unwind: '$wallet' },
         {
            $project: {
               name: 1,
               avatar: 1,
               currency: {
                  $filter: {
                     input: '$wallet.userWallet',
                     as: 'cr',
                     cond: {
                        $eq: [
                           '$$cr.currencyId',
                           mongoose.Types.ObjectId(selectedCurrency),
                        ],
                     },
                  },
               },
            },
         },
         { $unwind: '$currency' },
         {
            $lookup: {
               from: 'currencies',
               localField: 'currency.currencyId',
               foreignField: '_id',
               as: 'currency.info',
            },
         },
         { $unwind: '$currency.info' },
         {
            $project: {
               name: 1,
               avatar: 1,
               currency: {
                  balance: {
                     $convert: {
                        input: '$currency.balance',
                        to: 'string',
                     },
                  },
                  _id: '$currency.currencyId',
                  currencyName: '$currency.info.currencyName',
                  icon: '$currency.info.icon',
                  currencyType: '$currency.info.currencyType',
               },
            },
         },
      ]);

      const user = findUserInfo?.[0];

      if (!user) {
         return res.status(httpStatusCodes.NOT_FOUND).json({
            success: false,
            message: 'User not found',
         });
      }

      const {
         currency: { currencyName, balance },
      } = user;

      // convert user currency
      const conversionData = await currencyConverion(
         currencyName,
         userSelectedViewCurrency?.conversionCurrency,
         balance
      );

      const userCurrencyConvertionData = {
         ...user,
         currency: {
            ...user?.currency,
            balance: conversionData?.result,
            currencyConvertInto: userSelectedViewCurrency?.conversionCurrency,
         },
         viewCurrency: 'default',
      };

      return res.status(httpStatusCodes.OK).json({
         success: true,
         response: { user: userCurrencyConvertionData },
      });
   }

   if (crSymbol && !!currencyType && currencyType === 'CryptoCurrency') {
      const findUserInfo = await authModel.findOne(
         { _id: userId },
         { name: 1, avatar: 1 }
      );

      const userCurrencyInfo = await axios.get(
         `${CRYPTO_SERVER}/testnet/getSpecificCoin?currency=${crSymbol}&userId=${userCrId}`
      );

      const crptData = userCurrencyInfo?.data;

      if (crptData.success && crptData?.data && findUserInfo) {
         const {
            data: { symbol, balance },
         } = crptData;

         // convert user currency
         const conversionData = await currencyConverion(
            symbol,
            userSelectedViewCurrency?.conversionCurrency,
            balance
         );

         const response = {
            user: {
               name: findUserInfo?.name,
               _id: findUserInfo?._id,
               avatar: findUserInfo?.avatar,
               currency: {
                  ...crptData?.data,
                  balance: conversionData?.data?.result,
                  currencyConvertInto:
                     userSelectedViewCurrency?.conversionCurrency,
               },
               viewCurrency: 'default',
            },
         };

         return res
            .status(httpStatusCodes.OK)
            .json({ success: true, response });
      }

      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User is not fond',
      });
   }
});

const getAllGames = catchAsync(async function (req, res, next) {
   const findAllGames = await gameModel
      .find(
         {
            $and: [{ gameStatus: { $eq: 'Publish' } }],
         },
         { gameImage: 1, name: 1, by: 1 }
      )
      .populate('gameProvider', { providerName: 1, logo: 1 })
      .limit(5);

   if (findAllGames) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         gamesLists: findAllGames,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getSingleGameInfo = catchAsync(async function (req, res, next) {
   let { gameId, userId } = req.query;

   if (userId === 'undefined' || userId === 'null') {
      userId = undefined;
   }

   if (!gameId) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Game id is required',
      });
   }

   const findGame = await gameModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(gameId) } },
      {
         $addFields: {
            favoritesSize: { $size: '$favorites' },
            likesSize: { $size: '$likes' },
            gameInFavoritesList: {
               $filter: {
                  input: '$favorites',
                  as: 'favorites',
                  cond: {
                     $eq: [
                        '$$favorites.userId',
                        mongoose.Types.ObjectId(userId) || userId,
                     ],
                  },
               },
            },
            gameInLikeList: {
               $filter: {
                  input: '$likes',
                  as: 'like',
                  cond: {
                     $eq: [
                        '$$like.userId',
                        mongoose.Types.ObjectId(userId) || userId,
                     ],
                  },
               },
            },
         },
      },
      {
         $lookup: {
            from: 'gameproviders',
            localField: 'gameProvider',
            foreignField: '_id',
            as: 'gameProvider',
         },
      },
      { $unwind: '$gameProvider' },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
               by: '$by',
               description: '$description',
               aboutGame: '$aboutGame',
               gameImage: '$gameImage',
               url: '$url',
               urlMobile: '$urlMobile',
               previewImages: '$previewImages',
               gameStatus: '$gameStatus',
               favoritesSize: '$favoritesSize',
               gameInFavoritesList: '$gameInFavoritesList',
               gameInLikeList: '$gameInLikeList',
               likesSize: '$likesSize',
               gameBitcontroller: '$gameBitcontroller',
               gameProvider: {
                  _id: '$gameProvider._id',
                  providerName: '$gameProvider.providerName',
                  logo: '$gameProvider.logo',
               },
            },
         },
      },
   ]);

   if (findGame) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         game: findGame,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      error: true,
      success: false,
      message: 'Game not found',
   });
});

const getCommingSoonGames = catchAsync(async function (req, res, next) {
   const findDocuments = await gameModel.find(
      { gameStatus: 'Comming soon' },
      { name: 1, gameImage: 1 }
   );

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         games: findDocuments,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const FavoriteGameHandler = catchAsync(async function (req, res, next) {
   const { userId, gameId } = req.body;

   if (!userId || !gameId || userId === 'undefined' || userId === 'null') {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         message: 'Invalid input',
      });
   }

   // find the game from database. insert the user id into the game fevorite array.
   // also store the game id into the user document. for history.
   const checkUserIsExists = await gameModel.findOne(
      {
         _id: gameId,
         favorites: { $elemMatch: { userId } },
      },
      { 'favorites.$': 1 }
   );

   // check the user allready exists in games document favorites array. if user exists then remove the user from game collection.
   if (!!checkUserIsExists) {
      const removeUserFromFavorite = await gameModel.updateOne(
         { _id: gameId },
         { $pull: { favorites: { userId } } }
      );

      const storeGameInUserFavorite = await userHistoryModel.updateOne(
         { userId },
         { $pull: { favoriteGames: { gameId } } }
      );

      if (
         !!removeUserFromFavorite.modifiedCount &&
         !!storeGameInUserFavorite?.modifiedCount
      ) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            type: 'userRemoveFromGameFavoriteCollection',
         });
      }

      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   } else {
      const findAndStoreUser = await gameModel.updateOne(
         { _id: gameId },
         { $push: { favorites: { userId } } }
      );

      const storeGameInUserFavorite = await userHistoryModel.updateOne(
         { userId },
         { $push: { favoriteGames: { gameId } } }
      );

      if (
         !!findAndStoreUser.modifiedCount &&
         !!storeGameInUserFavorite?.modifiedCount
      ) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            type: 'userAddedInGameFavoriteCollection',
         });
      }

      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   }
});

const GameLikeHandler = catchAsync(async function (req, res, next) {
   const { userId, gameId } = req.body;

   if (!userId || !gameId || userId === 'undefined' || userId === 'null') {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         message: 'Invalid input',
      });
   }

   // if the user already liked the games then remove the user id from the
   // game collection liked array.
   // if the user not like the game then insert the user id inside the
   // game collection.
   // check the user id already liked or not.
   const checkUserIsLiked = await gameModel.findOne(
      {
         _id: gameId,
         likes: { $elemMatch: { userId } },
      },
      { 'likes.$': 1 }
   );

   if (checkUserIsLiked) {
      // unlike the game. and remove userid from the game like array.
      const removeUserFromLiked = await gameModel.updateOne(
         { _id: gameId },
         { $pull: { likes: { userId } } }
      );

      if (!!removeUserFromLiked.modifiedCount) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            type: 'userRemovedFromGameLikeCollection',
         });
      }
   } else {
      // like the game. store the user id inside the game like array.
      const addUserFromLiked = await gameModel.updateOne(
         { _id: gameId },
         { $push: { likes: { userId } } }
      );

      if (!!addUserFromLiked.modifiedCount) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            type: 'userAddedInGameLikeCollection',
         });
      }
   }
});

const GameCommentHandler = catchAsync(async function (req, res, next) {
   const { userId, gameId, message, avatar, userName } = req.body;

   if (!userId || !gameId || !message) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Input values is required',
      });
   }

   const _id = mongoose.Types.ObjectId();

   // find the game and the store the user comment inside the game collection
   const findAndStoreComment = await gameModel.updateOne(
      { _id: gameId },
      {
         $push: { comments: { _id, userId, comment: message } },
      }
   );

   const date = new Date();

   if (!!findAndStoreComment.modifiedCount) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: {
            avatar,
            userId,
            userName,
            _id,
            comment: message,
            createdAt: date,
         },
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Collection not found',
   });
});

const getSingleGameComments = catchAsync(async function (req, res, next) {
   let { gameId, userId } = req.query;

   if (userId === 'undefined' || userId === 'null') {
      userId = undefined;
   }

   if (!gameId) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Game id is required',
      });
   }

   const gameComments = await gameModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(gameId) } },
      {
         $addFields: {
            totalComments: { $size: '$comments' },
         },
      },
      { $unwind: '$comments' },
      {
         $addFields: {
            totalLikes: {
               $size: '$comments.likes',
            },
         },
      },
      { $sort: { 'comments.createdAt': -1 } },
      {
         $lookup: {
            from: 'auths',
            localField: 'comments.userId',
            foreignField: '_id',
            as: 'comments.user',
         },
      },
      {
         $addFields: {
            'comments.likeComment': {
               $filter: {
                  input: '$comments.likes',
                  as: 'like',
                  cond: {
                     $eq: [
                        '$$like.userId',
                        mongoose.Types.ObjectId(userId) || userId,
                     ],
                  },
               },
            },
         },
      },
      {
         $project: {
            _id: 1,
            comments: 1,
            totalComments: 1,
            totalLikes: 1,
         },
      },
      {
         $group: {
            _id: { _id: '$_id', totalComments: '$totalComments' },
            comments: {
               $push: {
                  userId: '$comments.user._id',
                  _id: '$comments._id',
                  comment: '$comments.comment',
                  avatar: '$comments.user.avatar',
                  userName: '$comments.user.name',
                  createdAt: '$comments.createdAt',
                  likeComment: '$comments.likeComment',
                  totalLikes: '$totalLikes',
               },
            },
         },
      },
   ]);

   if (gameComments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         comments: gameComments,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      error: true,
      success: false,
      message: 'Game not found',
   });
});

const likeGameComment = catchAsync(async function (req, res, next) {
   const { gameId, userId, commentId } = req.body;

   if (!userId || !gameId || !commentId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Input values is required',
      });
   }

   /**
    * check all the ides is exits in database. if user click on the like
    * buttton then check user already like the game or not. if user already
    * like the game then remove the user id from the like array. of store the
    * user id inside the game comments like array.
    * if user like the game then send like respose.
    * or the user unlike the vidoe then send unlike repose to the client.
    */

   const checkUserAlreadyLikeGame = await gameModel.findOne(
      {
         _id: gameId,
         comments: {
            $elemMatch: { _id: commentId, likes: { $elemMatch: { userId } } },
         },
      },
      { 'comments.$': 1 }
   );

   if (!!checkUserAlreadyLikeGame) {
      // remove user id from likes arrray.
      const removeUserLike = await gameModel.updateOne(
         { _id: gameId, 'comments._id': commentId },
         { $pull: { 'comments.$.likes': { userId } } }
      );

      if (!!removeUserLike?.modifiedCount) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            type: 'unlikeComment',
            commentId,
            userId,
         });
      }
   } else {
      // push user id into the likes array.
      const storeUserLike = await gameModel.updateOne(
         { _id: gameId, 'comments._id': commentId },
         { $push: { 'comments.$.likes': { userId } } }
      );

      if (!!storeUserLike?.modifiedCount) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            type: 'likeComment',
            commentId,
            userId,
         });
      }
   }
});

const SearchGames = catchAsync(async function (req, res, next) {
   const { search } = req.query;

   const DOCUMENT_LIMIT = 20;

   const findDocuments = await gameModel
      .find(
         { $text: { $search: search } },
         {
            name: 1,
            description: 1,
            gameImage: 1,
         }
      )
      .limit(DOCUMENT_LIMIT);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         gamesLists: findDocuments,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'internal server error',
   });
});

const getQeuryGames = catchAsync(async function (req, res, next) {
   const { q, page } = req.query;
   const DOCUMENT_LIMIT = 50;

   const documentCount = await gameModel.countDocuments({
      gameStatus: { $eq: 'Publish' },
   });

   const findDocuments = await gameModel.aggregate([
      {
         $match: {
            $and: [
               { $text: { $search: q } },
               {
                  $expr: { $eq: ['$gameStatus', { $toString: 'Publish' }] },
               },
            ],
         },
      },
      {
         $addFields: {
            totalLikes: { $size: '$likes' },
            totalFavorites: { $size: '$favorites' },
         },
      },
      {
         $lookup: {
            from: 'gameproviders',
            localField: 'gameProvider',
            foreignField: '_id',
            as: 'gameProvider',
         },
      },
      {
         $project: {
            _id: 1,
            name: 1,
            description: 1,
            gameImage: 1,
            gameStatus: 1,
            totalLikes: 1,
            totalFavorites: 1,
            gameProvider: {
               _id: '$gameProvider._id',
               providerName: '$gameProvider.providerName',
               logo: '$gameProvider.logo',
            },
         },
      },
   ]);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         games: findDocuments,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const storeRecentGames = catchAsync(async function (req, res, next) {
   const { gameId, userId } = req.body;

   if (!gameId || !userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Input values is required',
      });
   }

   const gameAlreadyInHistory = await userHistoryModel.findOne(
      {
         userId,
         recentPlayHistory: { $elemMatch: { gameId } },
      },
      { 'recentPlayHistory.$': 1 }
   );

   if (!!gameAlreadyInHistory) {
      // update the created game createdAt date.
      const updateGameDate = await userHistoryModel.updateOne(
         {
            userId,
            'recentPlayHistory.gameId': gameId,
         },
         {
            $set: {
               'recentPlayHistory.$.updatedAt': Date.now(),
            },
         }
      );

      if (!!updateGameDate?.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            message: 'Game date updated',
         });
      }

      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         error: true,
         message: 'Internal server error',
      });
   } else {
      // store new game id into the user recent play array.
      const storeGame = await userHistoryModel.updateOne(
         { userId },
         {
            $push: {
               recentPlayHistory: { gameId },
            },
         }
      );

      if (!!storeGame?.modifiedCount) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            message: 'Game stored',
         });
      }

      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         error: true,
         message: 'Internal server error',
      });
   }
});

const getRecentPlayGames = catchAsync(async function (req, res, next) {
   let { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Input values is required',
      });
   }

   if (userId === 'undefined' || userId === 'null') {
      userId = undefined;
   }

   const recentPlayHistoryGames = await userHistoryModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) || userId } },
      { $unwind: '$recentPlayHistory' },
      {
         $lookup: {
            from: 'games',
            localField: 'recentPlayHistory.gameId',
            foreignField: '_id',
            as: 'recentPlayHistory.game',
         },
      },
      {
         $project: {
            _id: 1,
            recentPlayHistory: 1,
         },
      },
      { $unwind: '$recentPlayHistory.game' },
      {
         $lookup: {
            from: 'gameproviders',
            localField: 'recentPlayHistory.game.gameProvider',
            foreignField: '_id',
            as: 'recentPlayHistory.game.gameProvider',
         },
      },
      {
         $addFields: {
            totalLikes: { $size: '$recentPlayHistory.game.likes' },
            totalFavorites: { $size: '$recentPlayHistory.game.favorites' },
         },
      },
      {
         $project: {
            _id: 1,
            gameId: '$recentPlayHistory.gameId',
            game_id: '$recentPlayHistory._id',
            name: '$recentPlayHistory.game.name',
            description: '$recentPlayHistory.game.description',
            gameImage: '$recentPlayHistory.game.gameImage',
            by: '$recentPlayHistory.game.by',
            totalLikes: 1,
            totalFavorites: 1,
            createdAt: '$recentPlayHistory.createdAt',
            updatedAt: '$recentPlayHistory.updatedAt',
            gameProvider: {
               _id: '$recentPlayHistory.game.gameProvider._id',
               providerName:
                  '$recentPlayHistory.game.gameProvider.providerName',
               logo: '$recentPlayHistory.game.gameProvider.logo',
            },
         },
      },
      { $sort: { updatedAt: -1 } },
      {
         $group: {
            _id: {
               _id: '$_id',
            },
            gamesList: {
               $push: {
                  _id: '$game_id',
                  gameId: '$gameId',
                  gameName: '$name',
                  by: '$by',
                  description: '$description',
                  gameImage: '$gameImage',
                  gameProvider: '$gameProvider',
                  totalLikes: '$totalLikes',
                  totalFavorites: '$totalFavorites',
               },
            },
         },
      },
   ]);

   if (recentPlayHistoryGames) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         games: recentPlayHistoryGames,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const deleteSingleRecentGame = catchAsync(async function (req, res, next) {
   const { gameId, userId } = req.query;

   if (!gameId || !userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Input values is required',
      });
   }

   const findDocumentAndDeleteGame = await userHistoryModel.updateOne(
      { userId },
      {
         $pull: {
            recentPlayHistory: { gameId },
         },
      }
   );

   if (!!findDocumentAndDeleteGame?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game removed from recent play',
         gameId,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: false,
      message: 'game id is not exists',
   });
});

const getUserFavoriteGames = catchAsync(async function (req, res, next) {
   let { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is reuqired',
      });
   }

   if (userId === 'undefined' || userId === 'null') {
      userId = undefined;
   }

   const findDocuments = await userHistoryModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) || userId } },
      { $unwind: '$favoriteGames' },
      {
         $lookup: {
            from: 'games',
            localField: 'favoriteGames.gameId',
            foreignField: '_id',
            as: 'favoriteGames.game',
         },
      },
      {
         $project: {
            _id: 1,
            favoriteGames: 1,
         },
      },
      { $unwind: '$favoriteGames.game' },
      {
         $lookup: {
            from: 'gameproviders',
            localField: 'favoriteGames.game.gameProvider',
            foreignField: '_id',
            as: 'favoriteGames.game.gameProvider',
         },
      },
      {
         $addFields: {
            totalLikes: { $size: '$favoriteGames.game.likes' },
            totalFavorites: { $size: '$favoriteGames.game.favorites' },
         },
      },
      {
         $project: {
            _id: 1,
            gameId: '$favoriteGames.gameId',
            game_id: '$favoriteGames._id',
            name: '$favoriteGames.game.name',
            description: '$favoriteGames.game.description',
            gameImage: '$favoriteGames.game.gameImage',
            by: '$favoriteGames.game.by',
            totalLikes: 1,
            totalFavorites: 1,
            createdAt: '$favoriteGames.createdAt',
            updatedAt: '$favoriteGames.updatedAt',
            gameProvider: {
               _id: '$favoriteGames.game.gameProvider._id',
               providerName: '$favoriteGames.game.gameProvider.providerName',
               logo: '$favoriteGames.game.gameProvider.logo',
            },
         },
      },
      { $sort: { updatedAt: -1 } },
      {
         $group: {
            _id: {
               _id: '$_id',
            },
            gamesList: {
               $push: {
                  _id: '$game_id',
                  gameId: '$gameId',
                  gameName: '$name',
                  by: '$by',
                  description: '$description',
                  gameImage: '$gameImage',
                  gameProvider: '$gameProvider',
                  totalLikes: '$totalLikes',
                  totalFavorites: '$totalFavorites',
               },
            },
         },
      },
   ]);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         games: findDocuments,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getTopRatedGames = catchAsync(async function (req, res, next) {
   const DOCUMENT_TOP_RATED_NUMBER = 1;
   const DOCUMENT_LIMIT = 50;

   const findDocuments = await gameModel.aggregate([
      {
         $match: {
            $expr: { $eq: ['$gameStatus', { $toString: 'Publish' }] },
         },
      },
      {
         $addFields: {
            totalFavorites: { $size: '$favorites' },
         },
      },
      { $match: { totalFavorites: { $gte: DOCUMENT_TOP_RATED_NUMBER } } },
      { $sort: { createdAt: -1 } },
      { $sort: { totalFavorites: -1 } },
      {
         $lookup: {
            from: 'gameproviders',
            localField: 'gameProvider',
            foreignField: '_id',
            as: 'gameProvider',
         },
      },
      { $unwind: '$gameProvider' },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            _id: 1,
            name: 1,
            by: 1,
            description: 1,
            gameImage: 1,
            totalFavorites: 1,
            gameProvider: {
               _id: '$gameProvider._id',
               providerName: '$gameProvider.providerName',
               logo: '$gameProvider.logo',
            },
         },
      },
   ]);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         games: findDocuments,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getProvidersGames = catchAsync(async function (req, res, next) {
   const { page, providerName } = req.query;

   if (!page || !providerName) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Invalid inputs',
      });
   }

   const DOCUMENT_LIMIT = 50;

   const documentCount = await gameProviderModel.aggregate([
      { $match: { providerName: providerName } },
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
      { $match: { providerName: providerName } },
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
            createdAt: 1,
            description: 1,
            totalGames: 1,
            profileTag: 1,
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
               createdAt: '$createdAt',
               totalGames: '$totalGames',
               description: '$description',
               profileTag: '$profileTag',
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

const sendSlotsGamesRespose = async function (
   games,
   DOCUMENT_LIMIT,
   totalGames,
   page,
   res
) {
   if (games) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(totalGames / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: totalGames,
         games: games,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'game not found!',
   });
};

const getAllGamesLists = catchAsync(async function (req, res, next) {
   const { page, filterBy } = req.query;
   const DOCUMENT_LIMIT = 50;

   if (!filterBy) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Filter value is required!',
      });
   }

   const documentCount = await gameCategoryModel.aggregate([
      { $match: { name: filterBy } },
      { $addFields: { totalGames: { $size: '$games' } } },
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
      { $match: { 'games.game.gameStatus': { $eq: 'Publish' } } },
      { $group: { _id: '$_id', totalGames: { $sum: 1 } } },
   ]);

   const totalGames = documentCount?.[0]?.totalGames;

   const gamesLists = await gameCategoryModel.aggregate([
      { $match: { name: filterBy } },
      { $unwind: { path: '$games', preserveNullAndEmptyArrays: true } },
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
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            _id: 1,
            name: 1,
            'games._id': 1,
            'games.game._id': 1,
            'games.game.name': 1,
            'games.game.gameImage': 1,
            'games.game.gameStatus': 1,
         },
      },
      {
         $match: {
            $expr: {
               $eq: ['$games.game.gameStatus', { $toString: 'Publish' }],
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
            },
            games: { $push: '$games' },
         },
      },
   ]);

   return sendSlotsGamesRespose(
      gamesLists,
      DOCUMENT_LIMIT,
      totalGames,
      page,
      res
   );
});

const getPopularGames = catchAsync(async function (req, res, next) {
   const { filter, page } = req.query;
   const DOCUMENT_LIMIT = 50;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is required',
      });
   }

   if (!filter) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Filter is required',
      });
   }

   const documentCount = await gameCategoryModel.aggregate([
      { $match: { name: filter } },
      { $addFields: { totalGames: { $size: '$games' } } },
      { $project: { totalGames: 1 } },
   ]);

   const totalGames = documentCount?.[0]?.totalGames;

   const games = await gameCategoryModel.aggregate([
      { $match: { name: filter } },
      { $unwind: { path: '$games', preserveNullAndEmptyArrays: true } },
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
         $addFields: {
            totalFavorites: { $size: '$games.game.favorites' },
         },
      },
      {
         $sort: {
            totalFavorites: -1,
         },
      },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            _id: 1,
            name: 1,
            'games._id': 1,
            'games.game._id': 1,
            'games.game.name': 1,
            'games.game.gameImage': 1,
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
            },
            games: { $push: '$games' },
         },
      },
   ]);

   return sendSlotsGamesRespose(games, DOCUMENT_LIMIT, totalGames, page, res);
});

const filterByNameGames = catchAsync(async function (req, res, next) {
   const { filter, page, sortWith } = req.query;
   const DOCUMENT_LIMIT = 50;

   if (!page || !filter || !sortWith) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Invalid inputs',
      });
   }

   let sortData = sortWith.toLowerCase();

   const documentCount = await gameCategoryModel.aggregate([
      { $match: { name: filter } },
      { $addFields: { totalGames: { $size: '$games' } } },
      { $project: { totalGames: 1 } },
   ]);

   const totalGames = documentCount?.[0]?.totalGames;

   const games = await gameCategoryModel.aggregate([
      { $match: { name: filter } },
      { $unwind: { path: '$games', preserveNullAndEmptyArrays: true } },
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
         $sort: {
            'games.game.name': sortData === 'a-z' ? -1 : 1,
         },
      },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            _id: 1,
            name: 1,
            'games._id': 1,
            'games.game._id': 1,
            'games.game.name': 1,
            'games.game.gameImage': 1,
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
            },
            games: { $push: '$games' },
         },
      },
   ]);

   return sendSlotsGamesRespose(games, DOCUMENT_LIMIT, totalGames, page, res);
});

const getAllGamesProviersWithGameCounts = catchAsync(async function (
   req,
   res,
   next
) {
   const { searchCollection } = req.query;

   if (!searchCollection) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Search id is required',
      });
   }

   const allProviers = await gameCategoryModel.aggregate([
      { $match: { name: searchCollection } },
      { $unwind: { path: '$games', preserveNullAndEmptyArrays: true } },
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
            'games._id': 1,
            'games.game': {
               $arrayElemAt: ['$games.game', 0],
            },
         },
      },
      {
         $lookup: {
            from: 'gameproviders',
            localField: 'games.game.gameProvider',
            foreignField: '_id',
            as: 'games.game.gameProvider',
         },
      },
      {
         $unwind: {
            path: '$games.game.gameProvider',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $project: {
            'games.game.name': 1,
            'games.game.gameProvider._id': 1,
            'games.game.gameProvider.providerName': 1,
            'games.game.gameProvider.status': 1,
         },
      },
      {
         $match: {
            $expr: {
               $eq: [
                  '$games.game.gameProvider.status',
                  { $toString: 'Publish' },
               ],
            },
         },
      },
      {
         $group: {
            _id: {
               providerId: '$games.game.gameProvider._id',
               providerName: '$games.game.gameProvider.providerName',
            },
            games: {
               $push: {
                  gameName: '$games.game.name',
               },
            },
         },
      },
      {
         $project: {
            _id: 1,
            games: 1,
            totalGames: { $size: '$games' },
         },
      },
   ]);

   if (allProviers) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         providers: allProviers,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: false,
      message: 'Internal server error',
   });
});

const getSelectedProviderGames = catchAsync(async function (req, res, next) {
   const { SelectedProvider, page, filterBy } = req.body;

   const DOCUMENT_LIMIT = 50;

   if (!SelectedProvider) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: 'Selected provider is requried',
      });
   }

   const providerGames = await gameProviderModel.aggregate([
      { $match: { providerName: { $in: SelectedProvider } } },
      { $addFields: { filter: 'gameProviderFilter' } },
      { $unwind: { path: '$games', preserveNullAndEmptyArrays: true } },
      {
         $lookup: {
            from: 'games',
            localField: 'games.gameId',
            foreignField: '_id',
            as: 'games.game',
         },
      },
      { $unwind: { path: '$games.game', preserveNullAndEmptyArrays: true } },
      {
         $match: {
            $expr: {
               $and: [
                  {
                     $eq: ['$games.gameCategoryName', { $toString: filterBy }],
                  },
                  {
                     $eq: ['$games.game.gameStatus', { $toString: 'Publish' }],
                  },
               ],
            },
         },
      },
      {
         $project: {
            _id: 1,
            providerName: 1,
            filter: 1,
            'games._id': 1,
            'games.game._id': 1,
            'games.game.name': 1,
            'games.game.gameImage': 1,
         },
      },
      { $group: { _id: { filter: '$filter' }, games: { $push: '$games' } } },
      {
         $project: {
            _id: { filter: 1, totalGames: { $size: '$games' } },
            games: {
               $slice: [
                  '$games',
                  page * DOCUMENT_LIMIT,
                  (page + 1) * DOCUMENT_LIMIT,
               ],
            },
         },
      },
   ]);

   if (providerGames) {
      const totalGames = providerGames[0]?._id?.totalGames;
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(totalGames / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: totalGames,
         games: providerGames,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: false,
      message: 'Internal server error',
   });
});

const allGamesLists = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is reuqired',
      });
   }

   const DOCUMENT_LIMIT = 50;

   const totalGames = await gameModel.countDocuments({
      gameStatus: { $eq: 'Publish' },
   });

   const gameLists = await gameModel.aggregate([
      { $match: { gameStatus: { $eq: 'Publish' } } },
      {
         $addFields: {
            totalFavorites: { $size: '$favorites' },
         },
      },
      { $sort: { totalFavorites: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            _id: 1,
            name: 1,
            gameImage: 1,
         },
      },
   ]);

   return sendSlotsGamesRespose(
      gameLists,
      DOCUMENT_LIMIT,
      totalGames,
      page,
      res
   );
});

const getNewReleasesGames = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is reuqired',
      });
   }

   const DOCUMENT_LIMIT = 50;

   const totalGames = await gameModel.countDocuments({
      gameStatus: { $eq: 'Publish' },
   });

   const gameLists = await gameModel.aggregate([
      { $match: { gameStatus: { $eq: 'Publish' } } },
      { $sort: { createdAt: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            _id: 1,
            name: 1,
            gameImage: 1,
         },
      },
   ]);

   return sendSlotsGamesRespose(
      gameLists,
      DOCUMENT_LIMIT,
      totalGames,
      page,
      res
   );
});

module.exports = {
   genrateGameToken,
   genrateRefreshToken,
   getGameUserInfo,
   FavoriteGameHandler,
   getAllGames,
   getSingleGameInfo,
   getCommingSoonGames,
   GameLikeHandler,
   GameCommentHandler,
   getSingleGameComments,
   likeGameComment,
   SearchGames,
   getQeuryGames,
   storeRecentGames,
   getRecentPlayGames,
   deleteSingleRecentGame,
   getUserFavoriteGames,
   getTopRatedGames,
   getProvidersGames,
   getAllGamesLists,
   getPopularGames,
   filterByNameGames,
   getAllGamesProviersWithGameCounts,
   getSelectedProviderGames,
   allGamesLists,
   getNewReleasesGames,
};
