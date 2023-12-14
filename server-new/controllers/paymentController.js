const {
   catchAsync,
   httpStatusCodes,
   currencyConverion,
   checkIsValidId,
} = require('../helper/helper');
const { v4: uuidv4 } = require('uuid');
const authModel = require('../model/schema/authSchema');
const currencyModel = require('../model/schema/currencySchema');
const walletModel = require('../model/schema/walletSchema');
const transactionModel = require('../model/schema/transactionSchema');
const { getConnectedUsers } = require('../socket/socketIo');
const walletPaymentOptionsModel = require('../model/schema/walletPaymentOptionsSchema');
const userSettingModel = require('../model/schema/userSettingSchema');
const axios = require('axios');

/* import checksum generation utility */
const PaytmChecksum = require('../config/paytem/PaytmChecksum');
const { default: mongoose, mongo } = require('mongoose');

const getFaitCurrencyListsWithAmount = catchAsync(async function (
   req,
   res,
   next
) {
   const { userId } = req.query;

   const CURRENCY_TYPE = 'FIAT';

   if (!userId) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'Unauthorization user',
      });
   }

   // check user exists in database or not. if not then send back the error respose
   const checkUserIsExists = await authModel.findOne(
      { _id: userId },
      { walletId: 1 }
   );

   if (!checkUserIsExists) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'Unauthorization user',
      });
   }

   // user wallet.
   const userWalletId = checkUserIsExists?.walletId;
   const findUserWalletCurrency = await walletModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userWalletId) } },
      { $unwind: '$userWallet' },
      {
         $lookup: {
            from: 'currencies',
            localField: 'userWallet.currencyId',
            foreignField: '_id',
            as: 'userWallet.currency',
         },
      },
      {
         $project: {
            _id: 1,
            userId: 1,
            'userWallet.balance': 1,
            'userWallet._id': 1,
            'userWallet.currency': {
               $arrayElemAt: ['$userWallet.currency', 0],
            },
         },
      },
      {
         $match: {
            $expr: {
               $and: [
                  { $eq: ['$userWallet.currency.locked', { $toBool: false }] },
                  { $eq: ['$userWallet.currency.currencyType', CURRENCY_TYPE] },
               ],
            },
         },
      },
      {
         $project: {
            _id: 1,
            userId: 1,
            'userWallet.balance': {
               $convert: {
                  input: '$userWallet.balance',
                  to: 'string',
               },
            },
            'userWallet._id': 1,
            'userWallet.currencyId': '$userWallet.currency._id',
            'userWallet.currencyName': '$userWallet.currency.currencyName',
            'userWallet.locked': '$userWallet.currency.locked',
            'userWallet.icon': '$userWallet.currency.icon',
         },
      },
      {
         $group: {
            _id: '$_id',
            items: {
               $push: '$userWallet',
            },
         },
      },
   ]);

   if (findUserWalletCurrency) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         currency: findUserWalletCurrency,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'User currency is not found!',
   });
});

const getSelectedCurrencyPaymentOptions = catchAsync(async function (
   req,
   res,
   next
) {
   const { currencyId } = req.query;

   if (!currencyId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Currency id is required',
      });
   }

   const paymentOptions = await currencyModel.aggregate([
      {
         $match: {
            _id: mongoose.Types.ObjectId(currencyId),
         },
      },
      {
         $unwind: {
            path: '$paymentOptions',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $lookup: {
            from: 'walletpaymentoptions',
            localField: 'paymentOptions.paymentMethodId',
            foreignField: '_id',
            as: 'paymentOptions.paymentMethod',
         },
      },
      {
         $project: {
            'paymentOptions.paymentMethod._id': 1,
            'paymentOptions.paymentMethod.name': 1,
            'paymentOptions.paymentMethod.wayName': 1,
            'paymentOptions.paymentMethod.min': {
               $convert: {
                  input: {
                     $arrayElemAt: ['$paymentOptions.paymentMethod.min', 0],
                  },
                  to: 'string',
               },
            },
            'paymentOptions.paymentMethod.max': {
               $convert: {
                  input: {
                     $arrayElemAt: ['$paymentOptions.paymentMethod.max', 0],
                  },
                  to: 'string',
               },
            },
            'paymentOptions.paymentMethod.icon': 1,
            'paymentOptions.paymentMethod.vipOnly': 1,
         },
      },
      {
         $unwind: {
            path: '$paymentOptions.paymentMethod',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $group: {
            _id: '$_id',
            paymentMethods: {
               $push: '$paymentOptions.paymentMethod',
            },
         },
      },
   ]);

   if (paymentOptions) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: paymentOptions,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Payment options is not found',
   });
});

const getSelectedCurrencyAmount = catchAsync(async function (req, res, next) {
   const { currencyId } = req.query;
   const { _id } = req.userPayload;

   if (!currencyId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Currency id is required',
      });
   }

   if (!_id) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'Unauthorization user',
      });
   }

   const walletAmount = await walletModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(_id) } },
      {
         $project: {
            wallet: {
               $filter: {
                  input: '$userWallet',
                  as: 'item',
                  cond: {
                     $eq: [
                        '$$item.currencyId',
                        mongoose.Types.ObjectId(currencyId),
                     ],
                  },
               },
            },
         },
      },
      { $unwind: '$wallet' },
      {
         $project: {
            _id: 0,
         },
      },
   ]);

   const walletAm = walletAmount?.[0]?.wallet;

   if (walletAmount && walletAm) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         walletAmount: walletAm,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'User wallet is not found!',
   });
});

const getUserAllFiatCurrency = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'Unauthorization user',
      });
   }

   const walletCurrency = await walletModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
         $unwind: {
            path: '$userWallet',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $lookup: {
            from: 'currencies',
            localField: 'userWallet.currencyId',
            foreignField: '_id',
            as: 'userWallet.currency',
         },
      },
      { $unwind: '$userWallet.currency' },
      {
         $match: {
            $expr: {
               $eq: [
                  '$userWallet.currency.currencyType',
                  { $toString: 'FIAT' },
               ],
            },
         },
      },
      {
         $project: {
            'userWallet.balance': {
               $convert: {
                  input: '$userWallet.balance',
                  to: 'string',
               },
            },
            userId: 1,
            'userWallet.currencyName': '$userWallet.currency.currencyName',
            'userWallet.icon': '$userWallet.currency.icon',
            'userWallet.currencyLocked': '$userWallet.currency.locked',
            'userWallet.currencyType': '$userWallet.currency.currencyType',
            'userWallet._id': '$userWallet.currency._id',
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               userId: '$userId',
            },
            wallet: { $push: '$userWallet' },
         },
      },
   ]);

   if (walletCurrency) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         walletCurrency,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'User wallet currency is not found!',
   });
});

const getUserSelectedGameCurrency = catchAsync(async function (req, res, next) {
   let { currencyId, userId } = req.query;

   if (currencyId === 'undefined' || (currencyId === 'null' && !currencyId)) {
      currencyId = undefined;
   }

   const findUserSelectedCurrecy = await walletModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
         $project: {
            userId: 1,
            currency: {
               $filter: {
                  input: '$userWallet',
                  as: 'item',
                  cond: {
                     $eq: [
                        '$$item.currencyId',
                        currencyId
                           ? mongoose.Types.ObjectId(currencyId)
                           : mongoose.Types.ObjectId(
                                '640a7051e142bc34400de0ef'
                             ),
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
            as: 'currency.cr',
         },
      },
      { $unwind: '$currency.cr' },
      {
         $project: {
            'currency.balance': {
               $convert: {
                  input: '$currency.balance',
                  to: 'string',
               },
            },
            'currency._id': '$currency.cr._id',
            'currency.locked': '$currency.cr.locked',
            'currency.icon': '$currency.cr.icon',
            'currency.currencyName': '$currency.cr.currencyName',
            'currency.currencyType': '$currency.cr.currencyType',
         },
      },
   ]);

   if (getUserSelectedGameCurrency) {
      return res.status(httpStatusCodes.OK).json({
         item: findUserSelectedCurrecy?.[0],
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Game currecy is not found',
   });
});

/** *************************** under process *************************** */
const paytemPayment = catchAsync(async function (req, res, next) {
   const { amount, email } = req.body;
   const totalAmount = JSON.stringify(amount);

   let params = {};

   /* initialize an array */
   params['MID'] = process.env.PAYTM_MERCHANT_ID;
   params['WEBSITE'] = process.env.PAYTM_WEBSITE;
   params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID_WEB;
   params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
   params['ORDER_ID'] = uuidv4();
   params['CUST_ID'] = uuidv4();
   params['TXN_AMOUNT'] = totalAmount;
   params['CALLBACK_URL'] = 'http://localhost:8000/api/callback';
   params['EMAIL'] = email;
   params['MOBILE_NO'] = '9876543210';

   /**
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    */
   let paytmChecksum = PaytmChecksum.generateSignature(
      params,
      process.env.PAYTM_MERCHANT_KEY
   );
   paytmChecksum
      .then(function (checksum) {
         let paytmParams = {
            ...params,
            CHECKSUMHASH: checksum,
         };
         return res.status(httpStatusCodes.OK).json(paytmParams);
      })
      .catch(function (error) {
         console.log(error);
      });
});
/** *************************** under process *************************** */

const fiatPaymentTransaction = catchAsync(async function (req, res, next) {
   const {
      userId,
      selectedCurrency,
      paymentMethod,
      amount,
      wayName,
      transactionType,
   } = req.body;

   if (!userId || !selectedCurrency || !paymentMethod || !amount) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'UNAUTHORIZATION USER',
      });
   }

   // create new fiat transaction
   const storeUserFiatTransaction = await transactionModel({
      userId,
      currencyId: selectedCurrency,
      amount: mongoose.Types.Decimal128(String(amount)),
      orderId: uuidv4(),
      wayName: wayName,
      transactionType,
      paymentMethod,
   }).save();

   if (storeUserFiatTransaction) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         orderId: storeUserFiatTransaction?.orderId,
         amount: storeUserFiatTransaction?.amount?.$numberDecimal,
         userId: storeUserFiatTransaction?.userId,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'internal server error',
   });
});

const getUserFiatCurrencyTransaction = catchAsync(async function (
   req,
   res,
   next
) {
   const { order_id } = req.query;
   if (!order_id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Order id is required',
      });
   }
   const findUserOrder = await transactionModel.aggregate([
      { $match: { orderId: order_id } },
      {
         $project: {
            transaction: {
               id: '$orderId',
               amount: {
                  $convert: {
                     input: '$amount',
                     to: 'string',
                  },
               },
               status: {
                  $cond: {
                     if: {
                        $and: [
                           { $ne: ['$status', 'COMPLETED'] },
                           { $ne: ['$status', 'FAILED'] },
                        ],
                     },
                     then: 'OPEN',
                     else: '$status',
                  },
               },
               note: null,
               created_at: '$createdAt',
               updatedAt: '$updatedAt',
               verify_time_stamp: null,
            },
         },
      },
   ]);
   const userOder = findUserOrder?.[0];
   if (!userOder) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         statusCode: httpStatusCodes.OK,
         response: null,
      });
   }
   return res.status(httpStatusCodes.OK).json({
      success: true,
      message: 'Transaction started successfully',
      statusCode: httpStatusCodes.OK,
      response: userOder,
   });
});

const sendSocketPaymentResponse = function (order, status, req) {
   const socket = req.app.get('socketIo');
   const users = getConnectedUsers();

   const socketUserId = order?.userId?.valueOf();

   // find the socket user.
   const findSockeUser = users.find((el) => el?.userId === socketUserId);

   if (findSockeUser) {
      const socketId = findSockeUser?.socketId;

      if (status === 'COMPLETED') {
         socket.to(socketId).emit('__payment_successful', {
            amount: order?.amount.toString(),
            currencyId: order?.currencyId,
            userId: order?.userId,
            status: status,
            wayName: order?.wayName,
            message: 'payment successful',
         });
      }

      if (status === 'FAILED') {
         socket.to(socketId).emit('__payment_failed', {
            userId: order?.userId,
            status: status,
            message: 'payment faild',
         });
      }
   }
};

const updateUserPaymentTransaction = catchAsync(async function (
   req,
   res,
   next
) {
   const { order_id } = req.query;
   const { status } = req.body;

   if (!order_id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Order id is required',
      });
   }

   if (!status) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         message: 'Response status is required',
      });
   }

   // first check the user transaction is exists or not.
   const isTransactionExists = await transactionModel.findOne(
      { orderId: order_id },
      { amount: 1, currencyId: 1, userId: 1, status: 1, wayName: 1 }
   );

   if (!isTransactionExists) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         message: 'User transaction is not exists',
      });
   }

   // find user transaction and update the status.
   const findAndUpdateTransaction = await transactionModel.updateOne(
      { orderId: order_id },
      {
         $set: {
            status,
         },
      }
   );

   // update the user transaction status
   // once user wallet transaction is updated then alos update the user wallet currency money.
   // then send back the response to the client.
   if (findAndUpdateTransaction?.modifiedCount) {
      const updateWalletBalance = await walletModel.updateOne(
         {
            userId: isTransactionExists?.userId,
            userWallet: {
               $elemMatch: { currencyId: isTransactionExists?.currencyId },
            },
         },
         {
            $inc: {
               'userWallet.$.balance': mongoose.Types.Decimal128(
                  isTransactionExists?.amount?.toString()
               ),
            },
         }
      );

      if (updateWalletBalance.modifiedCount) {
         // once user wallet transaction is successful then send back the socke response
         sendSocketPaymentResponse(isTransactionExists, status, req);

         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            message: 'payment successful',
         });
      }

      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Payment not updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const getUserFiatTransaction = catchAsync(async function (req, res, next) {
   const { userId, page } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'Unauthorization user',
      });
   }

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         message: 'Page number is reuqired',
      });
   }

   const DOCUMENT_LIMIT = 30;

   const documentCount = await transactionModel.countDocuments({
      userId: mongoose.Types.ObjectId(userId),
      transactionType: 'deposit',
   });

   const userTransactions = await transactionModel.aggregate([
      {
         $match: {
            $and: [
               { userId: mongoose.Types.ObjectId(userId) },
               { transactionType: 'deposit' },
            ],
         },
      },
      {
         $lookup: {
            from: 'currencies',
            localField: 'currencyId',
            foreignField: '_id',
            as: 'currency',
         },
      },
      { $unwind: '$currency' },
      {
         $project: {
            amount: {
               $convert: {
                  input: '$amount',
                  to: 'string',
               },
            },
            _id: 1,
            userId: 1,
            status: 1,
            createdAt: 1,
            // updatedAt: 1,
            currencyName: '$currency.currencyName',
            currencyIcon: '$currency.icon',
         },
      },
      { $sort: { createdAt: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $group: {
            _id: '$userId',
            transactions: {
               $push: {
                  _id: '$_id',
                  amount: '$amount',
                  status: '$status',
                  createdAt: '$createdAt',
                  updatedAt: '$updatedAt',
                  currencyName: '$currencyName',
                  currencyIcon: '$currencyIcon',
               },
            },
         },
      },
   ]);

   const transactions = userTransactions?.[0]?.transactions;

   if (userTransactions && transactions) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         transactions,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      transaction: [],
   });
});

const getSelectedTransactionInfo = catchAsync(async function (req, res, next) {
   const { transactionId } = req.query;

   if (!transactionId) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'Unauthorization user',
      });
   }

   const selectedTransaction = await transactionModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(transactionId) } },
      {
         $lookup: {
            from: 'currencies',
            localField: 'currencyId',
            foreignField: '_id',
            as: 'currency',
         },
      },
      { $unwind: '$currency' },
      {
         $project: {
            amount: {
               $convert: {
                  input: {
                     $cond: {
                        if: '$amount',
                        then: '$amount',
                        else: '$withdrawInformation.amount',
                     },
                  },
                  to: 'string',
               },
            },
            status: 1,
            createdAt: 1,
            currencyName: '$currency.currencyName',
            currencyIcon: '$currency.icon',
            wayName: 1,
            orderId: 1,
         },
      },
   ]);

   const transaction = selectedTransaction?.[0];

   if (transaction) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         transaction,
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      transaction: [],
   });
});

const getSelectedPaymentFields = catchAsync(async function (req, res, next) {
   const { selectedFiatPayment } = req.query;

   if (!selectedFiatPayment) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected payment is required',
      });
   }

   const fileds = await walletPaymentOptionsModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(selectedFiatPayment) } },
      {
         $unwind: {
            path: '$paymentFields',
         },
      },
      {
         $lookup: {
            from: 'paymentoptionsfields',
            localField: 'paymentFields.fieldId',
            foreignField: '_id',
            as: 'paymentFields.field',
         },
      },
      {
         $unwind: {
            path: '$paymentFields.field',
         },
      },
      {
         $project: {
            method: '$name',
            wayName: 'FIAT',
            channel: '$name',
            item: {
               label: '$paymentFields.field.label',
               labelKey: '$paymentFields.field.labelKey',
               fieldType: '$paymentFields.field.fieldType',
               hide: '$paymentFields.field.hide',
               readOnly: '$paymentFields.field.readOnly',
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               method: '$method',
               wayName: '$wayName',
               channel: '$channel',
            },
            item: { $push: '$item' },
         },
      },
   ]);

   if (fileds) {
      const items = fileds?.[0]?.item;

      if (!!items && items.length) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            payment: fileds?.[0]?._id,
            items,
         });
      }

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         payment: fileds?.[0]?._id,
         items: [],
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Payment options is not found',
   });
});

const makeUserFiatWithdrawTransaction = catchAsync(async function (
   req,
   res,
   next
) {
   const {
      withdrawInformation,
      transactionType,
      userId,
      currencyId,
      paymentMethodId,
   } = req.body;

   if (!userId || !currencyId) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'Unauthorization user',
      });
   }

   // find the user wallet.
   const findUserWalletAndUpdateAmount = await walletModel.updateOne(
      {
         userId: userId,
         userWallet: { $elemMatch: { currencyId } },
      },
      {
         $inc: {
            'userWallet.$.balance': mongoose.Types.Decimal128(
               `-${withdrawInformation?.amount}`
            ),
         },
      }
   );

   if (findUserWalletAndUpdateAmount?.modifiedCount) {
      // once user currecy amount in effected then store the user withdraw transaction
      // information.
      const createNewFiatWithdrawTransaction = await transactionModel({
         userId,
         currencyId,
         wayName: 'FIAT',
         orderId: uuidv4(),
         transactionType,
         withdrawInformation,
         paymentMethod: {
            paymentMethodId: paymentMethodId,
         },
      }).save();

      if (createNewFiatWithdrawTransaction) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            orderId: createNewFiatWithdrawTransaction?.orderId,
            message: 'your transaction in process',
            payAmount: +withdrawInformation?.amount,
            currencyId,
         });
      }
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getUserFiatWithdrawTransactions = catchAsync(async function (
   req,
   res,
   next
) {
   const { page, userId } = req.query;
   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is required',
      });
   }

   const DOCUMENT_LIMIT = 30;

   const documentCount = await transactionModel.countDocuments({
      userId: mongoose.Types.ObjectId(userId),
      transactionType: 'withdraw',
   });

   const transaction = await transactionModel.aggregate([
      {
         $match: {
            $and: [
               { userId: mongoose.Types.ObjectId(userId) },
               { transactionType: 'withdraw' },
            ],
         },
      },
      {
         $lookup: {
            from: 'currencies',
            localField: 'currencyId',
            foreignField: '_id',
            as: 'currency',
         },
      },
      { $unwind: '$currency' },
      {
         $project: {
            status: 1,
            createdAt: 1,
            amount: {
               $convert: {
                  input: '$withdrawInformation.amount',
                  to: 'string',
               },
            },
            currencyName: '$currency.currencyName',
            currencyIcon: '$currency.icon',
            transactionType: 1,
         },
      },
      { $sort: { createdAt: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
   ]);

   if (transaction) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         transactions: transaction,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      transaction: [],
   });
});

const updateUserCryptoDepositTransaction = catchAsync(async function (
   req,
   res,
   next
) {
   const { userId, status, symbol, balance, currencyType } = req.body;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is required',
      });
   }

   if (!status) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Status is reuqired',
      });
   }

   const socket = req.app.get('socketIo');
   const users = getConnectedUsers();

   // find the socket user.
   const findSockeUser = users.find((el) => el?.userCrId == userId);

   if (findSockeUser) {
      const socketId = findSockeUser?.socketId;

      if (status === 'COMPLETED') {
         socket.to(socketId).emit('__payment_successful', {
            userCrId: userId,
            status,
            symbol,
            balance,
            currencyType,
            message: 'Your Crypto amount is deposit',
         });
      }
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      message: 'User crypto balance updated',
   });
});

const sendGameSocketResponse = function (req, params) {
   const socket = req.app.get('socketIo');
   const users = getConnectedUsers();

   // find the socket user.
   users.find((elm) => {
      if (elm?.userId === params.userId) {
         const socketId = elm?.socketId;
         socket.to(socketId).emit('__game_bet_result', params);
      }
   });
};

const betResultTransaction = catchAsync(async function (req, res, next) {
   const { betResults } = req.body;
   const invalidUsersIds = [];

   if (!betResults) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Bet results is reuqired',
      });
   }

   if (!Array.isArray(betResults)) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         menubar: `Bet result must be array of object. insted of ${typeof betResults}.`,
      });
   }

   for (const el of betResults) {
      if (el?.betStatus !== 'win' && el?.betStatus !== 'loss') {
         console.log(el.betStatus); // log the repose value.
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Bet result status type onlye (win/loss).',
         });
         break;
      }

      const isValidId = checkIsValidId(el?.userId);

      if (isValidId) {
         const findUserSelectedCurrecy = await userSettingModel.findOne(
            { userId: el?.userId },
            { selectedCurrency: 1, conversionCurrency: 1 }
         );

         // convert user currency
         const conversionData = await currencyConverion(
            findUserSelectedCurrecy?.conversionCurrency,
            findUserSelectedCurrecy?.selectedCurrency?.crSymbol,
            el?.amount
         );

         if (!conversionData) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               menubar: 'Something worng with conversion api.',
            });
         }

         const params = {
            userId: el?.userId,
            betStatus: el?.betStatus,
            amount: conversionData?.data?.result,
         };

         console.log(params);
         console.log('currency conversion', conversionData?.data);

         if (
            !!findUserSelectedCurrecy &&
            findUserSelectedCurrecy?.selectedCurrency
         ) {
            let { currencyType, crSymbol, currencyId } =
               findUserSelectedCurrecy?.selectedCurrency;

            if (!currencyId) {
               currencyId = process.env.USER_DEFAULT_WALLET_CURRENCY_ID;
               currencyType = 'fiatCurrency';
            }

            if (currencyType === 'fiatCurrency') {
               const updateUserWalletAmount = await walletModel.updateOne(
                  {
                     userId: el?.userId,
                     userWallet: { $elemMatch: { currencyId } },
                  },
                  {
                     $inc: {
                        'userWallet.$.balance': `${
                           el?.betStatus === 'win'
                              ? mongoose.Types.Decimal128(
                                   `${conversionData?.data?.result}`
                                )
                              : mongoose.Types.Decimal128(
                                   `-${conversionData?.data?.result}`
                                )
                        }`,
                     },
                  }
               );

               if (!!updateUserWalletAmount?.modifiedCount) {
                  params.currencyType = currencyType;
                  params.currencyId = currencyId;

                  sendGameSocketResponse(req, params);
               } else {
                  invalidUsersIds.push(el?.userId);
               }
            }

            if (currencyType === 'CryptoCurrency') {
               const findUserCryptoId = await authModel.findOne(
                  { _id: el?.userId },
                  { userId: 1 }
               );

               const cryptoBlcObject = {
                  currencyType,
                  symbol: crSymbol,
                  balance:
                     el?.betStatus === 'win'
                        ? +conversionData?.data?.result
                        : -+conversionData?.data?.result,
                  userId: findUserCryptoId?.userId,
                  selectedCurrency: currencyId,
               };

               const updateUserCryptoBlc = await axios.post(
                  `${process.env.CRYPTO_PAYMENT_SERVER}/testnet/add-user-crypto-balance`,
                  cryptoBlcObject
               );

               const { data } = updateUserCryptoBlc;

               if (data?.success) {
                  params.currencyType = 'CRYPTO';
                  params.currencyId = currencyId;
                  params.symbol = crSymbol;

                  sendGameSocketResponse(req, params);
               }
            }
         }
      } else {
         invalidUsersIds.push(el?.userId);
      }
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      message: 'Game result saved',
      invalidUsers: invalidUsersIds,
   });
});

const updateUserGameBetCurrency = catchAsync(async function (req, res, next) {
   const socket = req.app.get('socketIo');
   const users = getConnectedUsers();

   const { userId, currencyId, amount, currencyType } = req.body;

   if (userId && currencyId && amount && currencyType) {
      if (currencyType === 'FIAT') {
         const updateUserWalletAmount = await walletModel.updateOne(
            {
               userId,
               userWallet: { $elemMatch: { currencyId } },
            },
            {
               $inc: {
                  'userWallet.$.balance': mongoose.Types.Decimal128(
                     `-${amount}`
                  ),
               },
            }
         );

         if (updateUserWalletAmount.modifiedCount) {
            // find the socket user.
            const findSockeUser = users.find((elm) => elm?.userId === userId);

            if (findSockeUser) {
               const socketId = findSockeUser?.socketId;

               socket.to(socketId).emit('__game_bet_transaction', {
                  userId,
                  currencyId,
                  amount,
                  currencyType,
               });
            }

            return res.status(httpStatusCodes.OK).json({
               success: true,
               error: false,
               message: 'User transactions send.',
            });
         }
      }
   }

   return res.status(httpStatusCodes.INVALID_INPUT).json({
      success: false,
      error: true,
      message: 'Invalid inputs',
   });
});

module.exports = {
   paytemPayment,
   getFaitCurrencyListsWithAmount,
   getSelectedCurrencyAmount,
   getUserAllFiatCurrency,
   getSelectedCurrencyPaymentOptions,
   getUserSelectedGameCurrency,
   fiatPaymentTransaction,
   getUserFiatCurrencyTransaction,
   updateUserPaymentTransaction,
   getUserFiatTransaction,
   getSelectedTransactionInfo,
   getSelectedPaymentFields,
   makeUserFiatWithdrawTransaction,
   getUserFiatWithdrawTransactions,
   updateUserCryptoDepositTransaction,
   betResultTransaction,
   updateUserGameBetCurrency,
};
