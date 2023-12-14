const { catchAsync, httpStatusCodes } = require('../helper/helper');
const groupModel = require('../model/schema/groupSchema');
const { default: mongoose } = require('mongoose');

const getChatGroups = catchAsync(async function (req, res, next) {
   const findChatgroups = await groupModel.find({}, { groupName: 1, _id: 1 });

   if (findChatgroups) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         groups: findChatgroups,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         error: true,
         success: false,
         message: 'Internal server error',
      });
   }
});

const getGroupChats = catchAsync(async function (req, res, next) {
   const { groupId, page } = req.query;

   const DOCUMENT_LIMIT = 30;

   if (!groupId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'Invalid group id',
      });
   }

   const chats = await groupModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(groupId) } },
      {
         $project: {
            _id: 1,
            groupName: 1,
            groupMessages: 1,
            totalMessagesCount: { $size: '$groupMessages' },
         },
      },
      { $unwind: '$groupMessages' },
      {
         $lookup: {
            from: 'auths',
            localField: 'groupMessages.userId',
            foreignField: '_id',
            as: 'groupMessages.user',
         },
      },
      { $unwind: '$groupMessages.user' },
      {
         $lookup: {
            from: 'usersettings',
            localField: 'groupMessages.userId',
            foreignField: 'userId',
            as: 'groupMessages.userSetting',
         },
      },
      { $unwind: '$groupMessages.userSetting' },
      {
         $project: {
            groupId: '$_id',
            groupName: 1,
            provider: '$groupMessages.provider',
            avatar: '$groupMessages.user.avatar',
            createdAt: '$groupMessages.createdAt',
            _id: '$groupMessages._id',
            message: '$groupMessages.message',
            userId: '$groupMessages.userId',
            name: '$groupMessages.user.name',
            gifphy: '$groupMessages.giphy',
            onlyEmogi: '$groupMessages.onlyEmogi',
            hideUser: '$groupMessages.userSetting.hideUser',
            hideUserName: '$groupMessages.userSetting.hideUserName',
            totaltotalMessagesCount: '$totalMessagesCount',
            totalPages: {
               $abs: {
                  $ceil: { $divide: ['$totalMessagesCount', DOCUMENT_LIMIT] },
               },
            },
         },
      },
      { $sort: { createdAt: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      { $sort: { createdAt: 1 } },
      {
         $group: {
            _id: {
               _id: '$groupId',
               groupName: '$groupName',
               totalPages: { $subtract: ['$totalPages', 1] },
               totaltotalMessagesCount: '$totaltotalMessagesCount',
               page: page,
            },
            groupMessages: {
               $push: {
                  avatar: '$avatar',
                  _id: '$_id',
                  message: '$message',
                  userId: '$userId',
                  createdAt: '$createdAt',
                  name: '$name',
                  gifphy: '$gifphy',
                  onlyEmogi: '$onlyEmogi',
                  hideUser: '$hideUser',
                  provider: '$provider',
                  hideUserName: '$hideUserName',
               },
            },
         },
      },
   ]);

   if (chats) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         chats,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         error: true,
         success: false,
         message: 'Internal server error',
      });
   }
});

module.exports = {
   getChatGroups,
   getGroupChats,
};
