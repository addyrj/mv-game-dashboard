const { catchAsync, httpStatusCodes } = require('../helper/helper');
const systemNotificationModel = require('../model/schema/systemNotificationSchema');

const getAllSystemNotifications = catchAsync(async function (req, res, next) {
   const notifications = await systemNotificationModel.aggregate([
      { $match: { $expr: { $eq: ['$publish', { $toBool: true }] } } },
      { $sort: { createdAt: -1 } },
      {
         $project: {
            heading: 1,
            description: 1,
            createdAt: 1,
         },
      },
   ]);

   if (notifications) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         notifications,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'System notification is not found',
   });
});

module.exports = { getAllSystemNotifications };
