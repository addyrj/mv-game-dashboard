const { default: mongoose } = require('mongoose');
const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const {addActivity} = require('../helper/activityHandler');
const currencyModel = require('../model/schema/currencySchema');
const axios = require('axios');

const getAllGameCurrency = catchAsync(async function (req, res, next) {
   // page number is required if we want to make a pagination.
   const { page } = req.query;
   const DOCUMENT_LIMIT = 10;

   const documentCount = await currencyModel.countDocuments();
   const findAllgamesCurrency = await currencyModel
      .find({}, { metaDescription: 0 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findAllgamesCurrency) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         currency: findAllgamesCurrency,
      });
   }
   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getSingleGameCurrency = catchAsync(async function (req, res, next) {
   const { id } = req.query;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Currency id is required',
      });
   }

   const findCurrencyDocument = await currencyModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $unwind: { path: '$paymentOptions', preserveNullAndEmptyArrays: true } },
      {
         $lookup: {
            from: 'walletpaymentoptions',
            localField: 'paymentOptions.paymentMethodId',
            foreignField: '_id',
            as: 'paymentOptions.payment',
         },
      },
      { $unwind: { path: '$paymentOptions.payment', preserveNullAndEmptyArrays: true } },
      {
         $project: {
            _id: 1,
            currencyName: 1,
            locked: 1,
            icon: 1,
            description: 1,
            metaDescription: 1,
            'paymentOptions._id': '$paymentOptions.payment._id',
            'paymentOptions.name': '$paymentOptions.payment.name',
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               currencyName: '$currencyName',
               locked: '$locked',
               icon: '$icon',
               description: '$description',
               metaDescription: '$metaDescription',
            },
            paymentOptions: { $push: '$paymentOptions' },
         },
      },
   ]);

   if (findCurrencyDocument) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         currency: findCurrencyDocument,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Currency is not found',
   });
});

const getAllCurrencyList = catchAsync(async function (req, res, next) {
   const allCurrency = await currencyModel.find({}, { currencyName: 1, icon: 1 });

   if (allCurrency) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         currency: allCurrency,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Currency is not found',
   });
});

// insert game curencey.
const insertGamesCurrency = catchAsync(async function (req, res, next) {
   const {
      currencyName,
      // locked,
      description,
      metaDescription,
      paymentOptions,
      currencyType,
   } = req.body;

   // first check currency name is already exists in database or not.
   // if the currency is already exists then send back the false response
   // other store the new currency in database.
   const findCurrencyIsExists = await currencyModel.findOne({ currencyName });

   if (findCurrencyIsExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'Currency is already exists',
      });
   }

   // database inserted data object.
   const insertData = {
      currencyName,
      // locked,
      description,
      metaDescription,
      currencyType,
   };

   // if user send the file then wait for the s3 upload.
   if (req.file && req.file !== 'undefined' && req.file !== 'null') {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      insertData.icon = uploadData.Location;
   }

   const paymentMethodArray = JSON.parse(paymentOptions);
   if (paymentOptions.length) {
      const selectedPaymentMethods = paymentMethodArray.map((el) => ({
         paymentMethodId: mongoose.Types.ObjectId(el?._id),
      }));

      insertData.paymentOptions = selectedPaymentMethods;
   }

   const insertNewCurrency = await currencyModel(insertData).save();

   if (insertNewCurrency) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'currency inserted',
         action: `admin inserted currency`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         currency: insertNewCurrency,
         message: 'Currency saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const updateSingleGameCurrency = catchAsync(async function (req, res, next) {
   const { id } = req.query;
   const {
      currencyName,
      // locked,
      description,
      metaDescription,
      paymentOptions,
      currencyType,
   } = req.body;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'currency id is required!',
      });
   }

   // check currency is exists.
   const findCurrencyDocument = await currencyModel.findOne({ _id: id });

   if (!findCurrencyDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Currency is not exists',
      });
   }

   if (findCurrencyDocument?.currencyName !== currencyName) {
      // check currency name is already exists
      const checkCurrencyAlreadyExists = await currencyModel.findOne({
         currencyName,
      });

      if (checkCurrencyAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: 'Game currency already exists',
         });
      }
   }

   // database inserted data object.
   const insertData = {
      currencyName,
      // locked,
      description,
      metaDescription,
      currencyType,
   };

   // if user send the file then wait for the s3 upload.
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      insertData.icon = uploadData.Location;
   }

   console.log(insertData);

   const paymentMethodArray = JSON.parse(paymentOptions);
   if (paymentOptions.length) {
      const selectedPaymentMethods = paymentMethodArray.map((el) => ({
         paymentMethodId: mongoose.Types.ObjectId(el?._id),
      }));

      insertData.paymentOptions = selectedPaymentMethods;
   }

   const findAndUpdateDocument = await currencyModel.updateOne({ _id: id }, { $set: insertData });

   if (!!findAndUpdateDocument?.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'currency updated',
         action: `admin updated single currency`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Currency updated',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      message: 'No changes',
   });
});

// delete single game currency
const deleteSingleGameCurrency = catchAsync(async function (req, res, next) {
   const { id } = req.query;

   const findAndDeleteDocument = await currencyModel.deleteOne({ _id: id });

   if (!!findAndDeleteDocument?.deletedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'currency deleted',
         action: `admin deleted single currency`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         id,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getAllGameCurrencyList = catchAsync(async function (req, res, next) {
   const findAllgamesCurrency = await currencyModel.aggregate([{ $project: { _id: 0, currencyName: 1, currencyType: 1, currencyId: '$_id' } }]);

   const getCryptoCurrency = await axios.get(`${process.env.CRYPTO_PAYMENT_SERVER}/testnet/get-coins`);

   if (findAllgamesCurrency && !!getCryptoCurrency && getCryptoCurrency?.data) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findAllgamesCurrency.concat(getCryptoCurrency?.data),
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

module.exports = {
   insertGamesCurrency,
   deleteSingleGameCurrency,
   getAllGameCurrency,
   getSingleGameCurrency,
   updateSingleGameCurrency,
   getAllCurrencyList,
   getAllGameCurrencyList,
};
