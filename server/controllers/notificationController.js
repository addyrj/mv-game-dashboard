const { catchAsync, httpStatusCodes } = require('../helper/helper');
const {addActivity} = require('../helper/activityHandler');
const systemNotificationModel = require('../model/schema/systemNotificationSchema');

const createNewSystemNotification = catchAsync(async function (req, res, next) {
   const { heading, description } = req.body;

   if (!heading) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         message: 'System notification heading is required',
      });
   }

   // store new system notification
   const storeNotification = await systemNotificationModel({
      heading,
      description,
   }).save();

   if (storeNotification) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'New Notification system',
         action: `admin created a new notification system`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'notification saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getAllSystemNotification = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is required',
      });
   }
   const DOCUMENT_LIMIT = 30;
   const documentCount = await systemNotificationModel.countDocuments();
   const notifications = await systemNotificationModel.aggregate([
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      { $sort: { updatedAt: -1 } },
      {
         $project: {
            _id: 1,
            heading: 1,
            createdAt: 1,
            updatedAt: 1,
            publish: 1,
         },
      },
   ]);

   if (notifications) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documentCount,
         notifications,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Notifications not found!',
   });
});

const deleteSingleNotification = catchAsync(async function (req, res, next) {
   const { id } = req.query;
   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Notification id is reuqired',
      });
   }

   // delete selected notification document
   const deleteNotification = await systemNotificationModel.deleteOne({
      _id: id,
   });

   if (deleteNotification?.deletedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'delete Notification system',
         action: `admin deleted a notification system`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Notification deleted',
         id,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Notification is not found!',
   });
});

const getSingleNotificationInfo = catchAsync(async function (req, res, next) {
   const { id } = req.query;
   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Notification id is reuqired',
      });
   }

   const findNotification = await systemNotificationModel.findOne(
      { _id: id },
      { __v: 0, createdAt: 0, updatedAt: 0 }
   );

   if (findNotification) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         notification: findNotification,
      });
   }
   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Notification is not found!',
   });
});

const updateSingleNotification = catchAsync(async function (req, res, next) {
   const { data, id } = req.body;
   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Notification id is reuqired',
      });
   }

   // find and update notification data
   const findAndUpdate = await systemNotificationModel.updateOne(
      { _id: id },
      { $set: data }
   );

   if (findAndUpdate?.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'Updated Notification system',
         action: `admin update a notification system`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'System notification information updated',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

module.exports = {
   createNewSystemNotification,
   getAllSystemNotification,
   deleteSingleNotification,
   getSingleNotificationInfo,
   updateSingleNotification,
};
