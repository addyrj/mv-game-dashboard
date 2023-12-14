const { default: mongoose } = require('mongoose');
const {
   catchAsync,
   checkIsValidId,
   httpStatusCodes,
} = require('../helper/helper');
const luckySpinModel = require('../model/schema/luckySpinSchema');
const userHistoryModel = require('../model/schema/userHistorySchema');
const walletModel = require('../model/schema/walletSchema');
const axios = require('axios');

const getUserDailySpinInfo = catchAsync(async function (req, res, next) {
   const { userId, drawId } = req.query;

   // if (!userId) {
   //    return res.status(httpStatusCodes.INVALID_INPUT).json({
   //       error: false,
   //       message: 'user id is required!',
   //    });
   // }

   // if user spin wheel first time then we want to campare values or check the user
   // spin the wheel by checking database spinToday filed. but if user already spin
   // and database value if true, then we want to campare the values by spintime and
   // spin 24 filed.
   // if today spin is false user can spin the wheel
   // if user already spin the wheel, and come back after 24 hrs. so we can campare
   // by the today spin time / current time and spin 24 hr time
   // if 24 hrs spin time is less then current time then user can spin the wheel.
   let isValidId;

   if (userId) {
      isValidId = checkIsValidId(userId);
   }

   if (!userId && !isValidId) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         response: [
            {
               // _id: '64538e31eadf0a40a4ce2bba',
               level: 0,
               todaySpin: true,
               Bronze: true,
               Gold: true,
               Diamond: true,
               userLogin: false,
            },
         ],
      });
   }

   if (isValidId) {
      // find user document
      const findUser = await userHistoryModel.aggregate([
         { $match: { userId: mongoose.Types.ObjectId(userId) } },
         {
            $addFields: {
               userLogin: true,
            },
         },
         {
            $project: {
               level: 1,
               userLogin: '$userLogin',
               spinDraw: {
                  $filter: {
                     input: '$drawSpin',
                     as: 'item',
                     cond: {
                        $eq: ['$$item.drawId', mongoose.Types.ObjectId(drawId)],
                     },
                  },
               },
               Bronze: {
                  $cond: {
                     if: {
                        $and: [
                           { $gte: ['$level', 0] },
                           { $lt: ['$level', 22] },
                        ],
                     },
                     then: true,
                     else: false,
                  },
               },
               Gold: {
                  $cond: {
                     if: {
                        $and: [
                           { $gte: ['$level', 22] },
                           { $lt: ['$level', 70] },
                        ],
                     },
                     then: true,
                     else: false,
                  },
               },
               Diamond: {
                  $cond: {
                     if: { $and: [{ $gte: ['$level', 70] }] },
                     then: true,
                     else: false,
                  },
               },
            },
         },
         {
            $unwind: {
               path: '$spinDraw',
               preserveNullAndEmptyArrays: true,
            },
         },
         {
            $addFields: {
               spinTimePeriodTimeStamp: { $toLong: '$spinDraw.spinTimePeriod' },
               today: { $toLong: new Date() },
            },
         },
         {
            $project: {
               todaySpin: {
                  $cond: {
                     if: { $lt: ['$spinTimePeriodTimeStamp', '$today'] },
                     then: true,
                     else: false,
                  },
               },
               Bronze: 1,
               Gold: 1,
               Diamond: 1,
               userLogin: 1,
               level: '$level',
            },
         },
      ]);

      if (findUser) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            response: findUser,
         });
      } else {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            error: true,
            message: 'User not found!',
         });
      }
   }
});

const getEnableDraw = catchAsync(async function (req, res, next) {
   const findEnableDraw = await luckySpinModel.aggregate([
      { $match: { enable: true } },
      {
         $project: {
            _id: 1,
            spinName: 1,
         },
      },
   ]);

   if (findEnableDraw) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: findEnableDraw,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getLuckSpinDrawInfo = catchAsync(async function (req, res, next) {
   const { selectedDraw } = req.query;

   if (!selectedDraw) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected draw id is required',
      });
   }

   const luckyDrawData = await luckySpinModel.aggregate([
      {
         $match: {
            $and: [
               { _id: mongoose.Types.ObjectId(selectedDraw) },
               { enable: { $eq: true } },
            ],
         },
      },
      { $unwind: '$spinItems' },
      {
         $project: {
            spinName: 1,
            spinItems: {
               name: 1,
               level: 1,
               icon: 1,
               price: {
                  $convert: {
                     input: '$spinItems.price',
                     to: 'string',
                  },
               },
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               spinName: '$spinName',
               enable: '$enable',
            },
            LuckSpinerWheelBronze: {
               $push: {
                  $cond: {
                     if: { $lt: ['$spinItems.level', 22] },
                     then: '$spinItems',
                     else: '$$REMOVE',
                  },
               },
            },
            LuckSpinerWheelGold: {
               $push: {
                  $cond: {
                     if: {
                        $and: [
                           { $gte: ['$spinItems.level', 22] },
                           { $lt: ['$spinItems.level', 70] },
                        ],
                     },
                     then: '$spinItems',
                     else: '$$REMOVE',
                  },
               },
            },
            LuckSpinerWheelDiamond: {
               $push: {
                  $cond: {
                     if: { $gte: ['$spinItems.level', 70] },
                     then: '$spinItems',
                     else: '$$REMOVE',
                  },
               },
            },
         },
      },
      {
         $project: {
            spinData: '$_id',
            _id: 0,
            LuckSpinerWheelBronze: 1,
            LuckSpinerWheelGold: 1,
            LuckSpinerWheelDiamond: 1,
         },
      },
   ]);

   const data = luckyDrawData?.[0];

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
      message: 'Spin is not found',
   });
});

const tomorrow = () => {
   // Change the date by adding 1 to it (today + 1 = tomorrow)
   // const updatedTime = new Date(today.getTime() + 1 * 60000); // 1 minutes = 1 * 60 seconds * 1000 milliseconds
   // return yyyy-mm-dd format
   // return updatedTime;

   // Get today's date
   let today = new Date();
   // today.setDate(today.getDate() + 1); //
   // return today.toISOString().split('T')[0];
   return today;
};

const updateUserSpinBlc = async function (
   findObjectByRandomNumber,
   userId,
   userCrId
) {
   // update the user winning balance.
   if (findObjectByRandomNumber?.currencyType === 'CRYPTO') {
      const updatedCryptoObject = {
         userId: userCrId,
         balance: findObjectByRandomNumber?.price,
         selectedCurrency: findObjectByRandomNumber?.selectedCurrency,
         _id: findObjectByRandomNumber?._id,
      };

      const updateBlc = await axios.post(
         `${process.env.CRYPTO_PAYMENT_SERVER}/testnet/add-user-crypto-balance`,
         updatedCryptoObject
      );

      return updateBlc?.data;
   } else if (findObjectByRandomNumber?.currencyType === 'FIAT') {
      const updateWalletBalance = await walletModel.updateOne(
         {
            userId,
            userWallet: {
               $elemMatch: {
                  currencyId: findObjectByRandomNumber?.selectedCurrency,
               },
            },
         },
         {
            $inc: {
               'userWallet.$.balance': mongoose.Types.Decimal128(
                  findObjectByRandomNumber?.price
               ),
            },
         }
      );

      return updateWalletBalance.modifiedCount;
   }
};

const getUserLuckyDrawAmount = catchAsync(async function (req, res, next) {
   /**
    * find the user first to check user has valid lucky draw level. if user is valid. then also check user already
    * spin the lucky draw or not. if user spin lucky draw first time then get the user level and also store the
    * draw id and the after 24h time inside the user document. so how to find the data which is depand on the user
    * level. simple check the user level and make query to get the only level base data from lucky spin draw
    * document. once user spin the wheel then get the random number
    * for the data and return to the valid user.
    */

   const { level, userId, selectedDraw, userCrId } = req.body;

   // if some fields is messing.
   if (!userId || !selectedDraw) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: true,
         message:
            'Some fields are messing. please check and then spin the wheel.',
      });
   }

   // check user level is valid to spin selected wheel.
   const findUserInfo = await userHistoryModel.findOne(
      { userId },
      { level: 1 }
   );

   if (!findUserInfo) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User is not found',
      });
   }

   // if user level is not valid to spin the selected wheel.
   const checkUserLevelIsValid = findUserInfo?.level >= level;

   if (!checkUserLevelIsValid) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `Your level is not valid for this spin. you can only spin with level ${level}`,
      });
   }

   // user level array.
   const levelArray = [
      { min: 0, max: 22 },
      { min: 22, max: 70 },
      { min: 70, max: 120 },
   ];

   const findUserLevelObject = levelArray.find((el) => el?.max >= level);

   // find the documents and the wheel data from the database based on the user level.
   const wheelSpinData = await luckySpinModel.aggregate([
      {
         $match: {
            $and: [
               { _id: mongoose.Types.ObjectId(selectedDraw) },
               { enable: { $eq: true } },
            ],
         },
      },
      { $unwind: '$spinItems' },
      {
         $match: {
            $and: [
               { 'spinItems.level': { $gte: findUserLevelObject?.min } },
               { 'spinItems.level': { $lte: findUserLevelObject?.max } },
            ],
         },
      },
      {
         $project: {
            price: {
               $convert: {
                  input: '$spinItems.price',
                  to: 'string',
               },
            },
            selectedCurrency: '$spinItems.selectedCurrency',
            currencyType: '$spinItems.currencyType',
            name: '$spinItems.name',
            level: '$spinItems.level',
         },
      },
   ]);

   if (!wheelSpinData) {
      throw new Error(`${level} level spin data is not found.`);
   }

   // get the length of the spin wheel items.
   const totalDocuments = wheelSpinData.length;
   // and get the random number from the wheel items.
   const randomMidNumber = Math.floor(Math.random() * totalDocuments);
   const findObjectByRandomNumber = wheelSpinData[randomMidNumber];

   // check user draw exists in the user history spin data.
   const checkUserHasAlreadyDraw = await userHistoryModel.findOne(
      {
         userId,
         drawSpin: { $elemMatch: { drawId: selectedDraw } },
      },
      { 'drawSpin.$': 1 }
   );

   const tomorrowDate = tomorrow();
   // if user spin draw is not exists inside the user history spin array that case we want to create
   // or push new entry, inside the user history spin array. if exists then only update the spin time.
   if (checkUserHasAlreadyDraw) {
      const updateUserSpinTime = await userHistoryModel.updateOne(
         { userId, drawSpin: { $elemMatch: { drawId: selectedDraw } } },
         {
            $set: {
               'drawSpin.$.drawId': selectedDraw,
               'drawSpin.$.spinTimePeriod': tomorrowDate,
            },
         }
      );

      await updateUserSpinBlc(findObjectByRandomNumber, userId, userCrId);

      if (updateUserSpinTime.modifiedCount) {
         // once object is found then send back the response to the user.
         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            winNumber: randomMidNumber,
            updateObject: findObjectByRandomNumber,
            userId,
         });
      }
   } else {
      const insertDrawInUserDoc = await userHistoryModel.updateOne(
         { userId },
         {
            $push: {
               drawSpin: {
                  drawId: selectedDraw,
                  spinTimePeriod: tomorrowDate,
               },
            },
         }
      );

      await updateUserSpinBlc(findObjectByRandomNumber, userId, userCrId);

      if (insertDrawInUserDoc.modifiedCount) {
         // once object is found then send back the response to the user.
         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            winNumber: randomMidNumber,
            updateObject: findObjectByRandomNumber,
            userId,
         });
      }
   }
});

module.exports = {
   getEnableDraw,
   getUserDailySpinInfo,
   getLuckSpinDrawInfo,
   getUserLuckyDrawAmount,
};
