const { default: mongoose } = require('mongoose');
const { catchAsync, httpStatusCodes, checkIsValidId } = require('../helper/helper');
const {addActivity} = require('../helper/activityHandler');

const luckySpinModel = require('../model/schema/luckySpinSchema');
const lotteryPollModel = require('../model/schema/lotteryGameSchema');
const authModel = require('../model/schema/authSchema');
const lotteryPollUsersModel = require('../model/schema/lotteryPollUsersSchema');

const createNewLuckyDraw = catchAsync(async function (req, res, next) {
   const { spinName, spinItems, enable } = req.body;

   if (!spinName) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Spin name is reuqired',
      });
   }

   // check draw is already exists or not.
   const findDraw = await luckySpinModel.findOne({ spinName }, { _id: 1 });

   if (findDraw) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Draw already exists.',
      });
   }

   const saveNewDraw = await luckySpinModel({
      spinName,
      spinItems,
      enable,
   }).save();

   if (saveNewDraw) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'New Lucky Draw',
         action: `admin created new Lucky draw`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Lucky draw saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const updateSpinLuckyDraw = catchAsync(async function (req, res, next) {
   const { id } = req.query;
   const { spinName, spinItems, enable } = req.body;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Id is reuqired',
      });
   }

   const isValidId = checkIsValidId(id, res);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const updateSpinItem = await luckySpinModel.updateOne({ _id: id }, { $set: { spinName, spinItems, enable } });

   if (updateSpinItem.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'update Lucky Draw',
         action: `admin updated a Lucky draw`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const getAllLuckyDraw = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is reuqired',
      });
   }

   const DOCUMENT_LIMIT = 10;

   const documentCount = await luckySpinModel.countDocuments({});
   const findLuckySpin = await luckySpinModel
      .find({}, { spinItems: 0 })
      .sort({ createdAt: -1 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findLuckySpin) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         item: findLuckySpin,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const getSingleLuckyDraw = catchAsync(async function (req, res, next) {
   const { id } = req.query;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Lucky draw id is reuqired',
      });
   }

   const isValidId = checkIsValidId(id, res);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const findLuckySpin = await luckySpinModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $unwind: '$spinItems' },
      {
         $project: {
            spinName: 1,
            createdAt: 1,
            enable: 1,
            spinItems: {
               name: 1,
               icon: 1,
               level: { $convert: { input: '$spinItems.level', to: 'string' } },
               price: {
                  $convert: { input: '$spinItems.price', to: 'string' },
               },
               selectedCurrency: 1,
               currencyType: 1,
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               spinName: '$spinName',
               createdAt: '$createdAt',
               enable: '$enable',
            },
            spinItems: { $push: '$spinItems' },
         },
      },
      {
         $project: {
            _id: 0,
            item: '$_id',
            spinItems: '$spinItems',
         },
      },
   ]);

   const item = findLuckySpin?.[0];

   if (item) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: item,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const getAllLotteryPoll = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is reuqired',
      });
   }

   const DOCUMENT_LIMIT = 9;
   const countDocuments = await lotteryPollModel.countDocuments();
   const lotteryPolls = await lotteryPollModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            gameId: 1,
            lotteryPollResultTime: 1,
            lotteryPollResult: 1,
            lotteryPollResultShow: 1,
            createdAt: 1,
         },
      },
   ]);

   if (lotteryPolls) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: lotteryPolls,
         totalDocuments: countDocuments,
         totalPages: Math.ceil(countDocuments / DOCUMENT_LIMIT - 1),
         page: +page,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const getSingleLuckyDrawPoll = catchAsync(async function (req, res, next) {
   const { gameId } = req.query;

   if (!gameId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game id is reuqired',
      });
   }

   const isValidId = checkIsValidId(gameId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const findPoll = await lotteryPollModel.aggregate([{ $match: { _id: mongoose.Types.ObjectId(gameId) } }]);

   const data = findPoll?.[0];

   if (data) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: data,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const updateLuckyDrawPollResult = catchAsync(async function (req, res, next) {
   const { gameId, optionalNumbers, jackpotBall } = req.body;

   const isValidId = checkIsValidId(gameId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const findAndUpdateResult = await lotteryPollModel.updateOne(
      { _id: gameId },
      {
         $set: {
            lotteryPollResult: {
               luckyNumbers: optionalNumbers,
               jackpotBallNumber: jackpotBall,
            },
         },
      }
   );

   if (findAndUpdateResult?.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'update Lucky Draw result',
         action: `admin update Lucky draw poll result`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Result updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Already updated',
   });
});

const getSingleLotteryDrawUsersList = catchAsync(async function (req, res, next) {
   const { gameId, filter, page } = req.query;

   if (!gameId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game id is reuqired',
      });
   }

   const isValidId = checkIsValidId(gameId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const DOCUMENT_LIMIT = 30;

   const findLotteryPollData = await lotteryPollUsersModel.aggregate([
      { $match: { lotteryGameId: mongoose.Types.ObjectId(gameId) } },
      {
         $project: {
            createdAt: 1,
            item: {
               $cond: {
                  if: { $eq: [filter, 'participate'] },
                  then: '$lotteryParticipateUsers',
                  else: '$winners',
               },
            },
         },
      },
      { $addFields: { numberOfDocuments: { $size: '$item' } } },
      { $unwind: { path: '$item', preserveNullAndEmptyArrays: true } },
      { $sort: { 'item.createdAt': -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $lookup: {
            from: 'auths',
            localField: 'item.userId',
            foreignField: '_id',
            as: 'user',
         },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
         $project: {
            'item.numberOfTickets': 1,
            'item.lotteryPollNumbers': 1,
            'item.price': {
               $cond: {
                  if: { $eq: [{ $type: '$item.price' }, 'missing'] },
                  then: '$$REMOVE',
                  else: {
                     $convert: {
                        input: '$item.price',
                        to: 'string',
                     },
                  },
               },
            },
            'item.isUsed': 1,
            'item.refundTicket': 1,
            'item._id': 1,
            'item.createdAt': 1,
            'user.name': 1,
            'user.avatar': 1,
            numberOfDocuments: 1,
         },
      },
      {
         $group: {
            _id: { _id: '$_id', numberOfDocuments: '$numberOfDocuments' },
            lotteryPollData: {
               $push: {
                  $cond: {
                     if: {
                        $ne: [{ $ifNull: ['$item.price', null] }, null],
                     },
                     then: {
                        items: '$item',
                        user: '$user',
                     },
                     else: '$$REMOVE',
                  },
               },
            },
         },
      },
      { $project: { lotteryPoll: '$_id', _id: 0, lotteryPollData: 1 } },
   ]);

   const data = findLotteryPollData?.[0];

   if (!data) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Not found',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      item: data,
      page: +page,
      totalPages: Math.ceil(data?.lotteryPoll?.numberOfDocuments / DOCUMENT_LIMIT - 1),
   });
});

const getUserTicketLuckyNumbersCount = catchAsync(async function (req, res, next) {
   const { gameId } = req.query;

   if (!gameId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game id is reuqired',
      });
   }

   const findDocuments = await lotteryPollUsersModel.aggregate([
      { $match: { lotteryGameId: mongoose.Types.ObjectId(gameId) } },
      {
         $unwind: {
            path: '$lotteryParticipateUsers',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $unwind: {
            path: '$lotteryParticipateUsers.lotteryPollNumbers.luckyNumbers',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $group: {
            _id: '$lotteryParticipateUsers.lotteryPollNumbers.luckyNumbers',
            count: { $sum: 1 },
         },
      },
      { $project: { _id: 0, name: '$_id', count: 1 } },
      { $sort: { name: 1 } },
   ]);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findDocuments?.[0]?.name ? findDocuments : new Array(36).fill(0).map((_, idx) => ({ name: idx + 1, count: 0 })),
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

const getUserTicketJackpotNumbersCount = catchAsync(async function (req, res, next) {
   const { gameId } = req.query;

   if (!gameId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game id is reuqired',
      });
   }

   const findDocuments = await lotteryPollUsersModel.aggregate([
      { $match: { lotteryGameId: mongoose.Types.ObjectId(gameId) } },
      {
         $unwind: {
            path: '$lotteryParticipateUsers',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $group: {
            _id: '$lotteryParticipateUsers.lotteryPollNumbers.jackpotBallNumber',
            count: { $sum: 1 },
         },
      },
      { $project: { _id: 0, name: '$_id', count: 1 } },
      { $sort: { name: 1 } },
   ]);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findDocuments?.[0]?.name ? findDocuments : new Array(10).fill(0).map((_, idx) => ({ name: idx + 1, count: 0 })),
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

module.exports = {
   createNewLuckyDraw,
   updateSpinLuckyDraw,
   getAllLuckyDraw,
   getSingleLuckyDraw,
   getAllLotteryPoll,
   getSingleLuckyDrawPoll,
   updateLuckyDrawPollResult,
   getSingleLotteryDrawUsersList,
   getUserTicketLuckyNumbersCount,
   getUserTicketJackpotNumbersCount,
};
