const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const authModel = require('../model/schema/authSchema');
const medelsModel = require('../model/schema/medalSchema');
const { default: mongoose } = require('mongoose');
const messageModel = require('../model/schema/messageSchema');
const avatarModel = require('../model/schema/avatarSchema');
const gameCategoryModel = require('../model/schema/gameCategorySchema');
const { getConnectedUsers } = require('../socket/socketIo');
const userSettingModel = require('../model/schema/userSettingSchema');
const userSocialNetworkModel = require('../model/schema/userSocialNetworkSchema');

const getUserInformation = catchAsync(async function (req, res, next) {
   const { userId } = req.query;
   const findUserInfo = await authModel.findOne(
      { _id: userId },
      { password: 0, role: 0 }
   );

   if (findUserInfo) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         user: findUserInfo,
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Not found!',
      });
   }
});

const updateUserName = catchAsync(async function (req, res, next) {
   const { userId, userName } = req.body;
   const socket = req.app.get('socketIo');
   const users = getConnectedUsers();
   const socketUserId = userId?.valueOf();
   console.log(socketUserId);

   /**
    * check the user is exits or not.
    * if the user is not exists then thorw the error.
    * if the user exists then update the values and also set the updated values in browser cookie.
    */

   const findUserIsExists = await authModel.findOne({ _id: userId });

   if (findUserIsExists) {
      const updateName = await authModel.updateOne(
         { _id: userId },
         { $set: { name: userName } }
      );

      if (!!updateName.modifiedCount) {
         // find the socket user.
         const findSockeUser = users.find((el) => el?.userId === socketUserId);
         const socketId = findSockeUser?.socketId;

         users.forEach((el) => {
            if (el?.userId !== socketUserId) {
               socket.to(el?.socketId).emit('__user_chage_profile_info', {
                  userId,
                  name: userName,
               });
            }
         });

         socket.to(socketId).emit('__profile_info_change', {
            userId,
            // type: 'profileNameChange',
            name: userName,
            message: 'Your profile name is changed',
         });

         const authObject = {
            email: findUserIsExists.email,
            name: userName,
            avatar: findUserIsExists.avatar,
            _id: findUserIsExists._id,
         };

         // res.cookie('_mv_games_auth', authObject);

         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            userName,
            message: 'user name updated',
            auth: authObject,
         });
      }
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         success: false,
         error: true,
         message: 'Account not found',
      });
   }
});

const UpdateUserValues = async function (userId, selectedImage, res, req) {
   // find the user is exists or not.
   const findUserIsExists = await authModel.findOne(
      { _id: userId },
      {
         email: 1,
         name: 1,
         avatar: 1,
         coins: 1,
         roles: 1,
         userId: 1,
      }
   );

   // send back the error response.
   if (!findUserIsExists) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         message: 'No user exists',
      });
   }

   // update the selected user filed.
   const udpateUser = await authModel.updateOne(
      { _id: userId },
      {
         $set: {
            avatar: selectedImage,
         },
      }
   );

   if (!!udpateUser.modifiedCount) {
      const socket = req.app.get('socketIo');
      const users = getConnectedUsers();
      const socketUserId = userId?.valueOf();

      // find the socket user.
      const findSockeUser = users.find((el) => el?.userId === socketUserId);
      const socketId = findSockeUser?.socketId;

      users.forEach((el) => {
         if (el?.userId !== socketUserId) {
            socket.to(el?.socketId).emit('__user_chage_profile_info', {
               userId,
               avatar: selectedImage,
            });
         }
      });

      socket.to(socketId).emit('__profile_info_change', {
         userId,
         avatar: selectedImage,
         message: 'Your profile avatar is changed',
      });

      const authObject = {
         email: findUserIsExists.email,
         name: findUserIsExists.name,
         avatar: selectedImage,
         _id: findUserIsExists._id,
         coins: findUserIsExists?.coins,
         roles: findUserIsExists.roles,
         userId: findUserIsExists.userId,
      };

      // udpate the cookie values.
      // res.cookie('_mv_games_auth', authObject);

      // send back response.
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         message: 'Avatar updated',
         avatar: selectedImage,
         auth: authObject,
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Not Found!',
      });
   }
};

const updateAvatarHandler = catchAsync(async function (req, res, next) {
   const { selectedImage, userId } = req.body;
   const files = req.files;

   // when the user upload the new image then genrate the new unique id for that image.
   // if user select the avatar then only update the selected user avatar filed.
   if (selectedImage) {
      await UpdateUserValues(userId, selectedImage, res, req);
   }

   if (files) {
      let userProfileImage = req.files.find(
         (el) => el.fieldname === 'profileImage'
      );

      let filename;

      // find game main image is exists or not in req.
      if (userProfileImage) {
         const uploadData = await uploadToS3(userProfileImage.buffer);
         filename = uploadData.Location;
      }

      await UpdateUserValues(userId, filename, res, req);
   }
});

const getAllMadels = catchAsync(async function (req, res, next) {
   const allMadels = await medelsModel.find({});
   if (allMadels) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         madels: allMadels,
      });
   } else {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'someting worng',
      });
   }
});

// get other user information.
const getSelectedUserInfo = catchAsync(async function (req, res, next) {
   const { userId, selectedUserId } = req.query;

   const findUserInfo = await authModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(selectedUserId) } },
      {
         $lookup: {
            from: 'usersettings',
            localField: '_id',
            foreignField: 'userId',
            as: 'userSetting',
         },
      },
      { $unwind: '$userSetting' },
      {
         $lookup: {
            from: 'usersocialnetworks',
            localField: '_id',
            foreignField: 'userId',
            as: 'usersocialnetworks',
         },
      },
      { $unwind: '$usersocialnetworks' },
      {
         $project: {
            _id: 1,
            name: 1,
            email: 1,
            userId: 1,
            avatar: 1,
            madels: 1,
            statisticsHidden: '$userSetting.statisticsHidden',
            privateChat: '$userSetting.privateChat',
            newFriendRequest: '$userSetting.newFriendRequest',
            online: '$userSetting.online',
            hideUser: 1,
            requests: {
               $filter: {
                  input: '$usersocialnetworks.friendRequests',
                  as: 'request',
                  cond: {
                     $eq: ['$$request.userId', mongoose.Types.ObjectId(userId)],
                  },
               },
            },
            isFriend: {
               $filter: {
                  input: '$usersocialnetworks.friends',
                  as: 'friend',
                  cond: {
                     $eq: ['$$friend.userId', mongoose.Types.ObjectId(userId)],
                  },
               },
            },
            isBlocked: {
               $filter: {
                  input: '$usersocialnetworks.blockedUsers',
                  as: 'blocked',
                  cond: {
                     $eq: ['$$blocked.userId', mongoose.Types.ObjectId(userId)],
                  },
               },
            },
         },
      },
   ]);

   if (findUserInfo) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         user: findUserInfo[0],
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Not found!',
      });
   }
});

const getPrivacyFieldStatus = catchAsync(async function (req, res, next) {
   /**
    * find user privacy information.
    * if user want to update privacy fileds then first check the user filed values.
    */
   const { userId } = req.query;

   const findUserInfo = await userSettingModel.findOne(
      { userId },
      {
         statisticsHidden: 1,
         online: 1,
         privateChat: 1,
         newFriendRequest: 1,
         hideUser: 1,
         hideUserName: 1,
         conversionCurrency: 1,
      }
   );

   if (findUserInfo) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         response: findUserInfo,
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Not Found!',
      });
   }
});

const updateUserPrivacy = catchAsync(async function (req, res, next) {
   const { field, value, userId } = req.query;

   /**
    * find user with user id and then update the privacy fileds.
    * if the user is not exits then send back the error respose 401.
    */

   const updatePrivacyfiled = await userSettingModel.updateOne(
      { userId },
      {
         $set: {
            [field]: value,
         },
      }
   );

   if (!!updatePrivacyfiled.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         message: `${field} field is updated`,
         field: field,
         value,
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Not Found!',
      });
   }
});

const getFriendRequestList = catchAsync(async function (req, res, next) {
   const { userId } = req.query;
   // find the user is user exits or not in database.
   const findUserRequestList = await userSocialNetworkModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $unwind: '$friendRequests' },
      {
         $lookup: {
            from: 'auths',
            localField: 'friendRequests.userId',
            foreignField: '_id',
            as: 'friendRequests.userInfo',
         },
      },
      { $unwind: '$friendRequests.userInfo' },
      { $sort: { 'friendRequests.createdAt': -1 } },
      {
         $project: {
            _id: 1,
            'friendRequests.userId': 1,
            'friendRequests.status': 1,
            'friendRequests._id': 1,
            'friendRequests.createdAt': 1,
            'friendRequests.name': '$friendRequests.userInfo.name',
            'friendRequests.email': '$friendRequests.userInfo.email',
            'friendRequests.avatar': '$friendRequests.userInfo.avatar',
         },
      },
      {
         $group: {
            _id: { _id: '$_id' },
            friendRequests: { $push: '$friendRequests' },
         },
      },
   ]);

   if (findUserRequestList) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         response: findUserRequestList,
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         success: false,
         message: 'Not Found!',
      });
   }
});

const getFriendList = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   if (userId) {
      const allFriends = await userSocialNetworkModel.aggregate([
         { $match: { userId: mongoose.Types.ObjectId(userId) } },
         {
            $project: {
               name: 1,
               email: 1,
               avatar: 1,
               friends: 1,
            },
         },
         { $unwind: '$friends' },
         {
            $lookup: {
               from: 'auths',
               localField: 'friends.userId',
               foreignField: '_id',
               as: 'friends.userInfo',
            },
         },
         { $unwind: '$friends.userInfo' },
         {
            $project: {
               name: 1,
               email: 1,
               avatar: 1,
               'friends.userId': 1,
               'friends._id': 1,
               'friends.createdAt': 1,
               'friends.name': '$friends.userInfo.name',
               'friends.email': '$friends.userInfo.email',
               'friends.avatar': '$friends.userInfo.avatar',
            },
         },
         {
            $group: {
               _id: {
                  _id: '$_id',
                  name: '$name',
                  email: '$name',
               },
               friends: {
                  $push: '$friends',
               },
            },
         },
      ]);

      if (allFriends) {
         return res.status(httpStatusCodes.OK).json({
            error: false,
            success: true,
            response: allFriends,
         });
      } else {
         return res.status(httpStatusCodes.NOT_FOUND).json({
            error: true,
            success: false,
            message: 'Not Found!',
         });
      }
   } else {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         msg: 'User id is required',
      });
   }
});

const getPrivateMessages = catchAsync(async function (req, res, next) {
   const { userId, selectedUserId, page } = req.query;
   // inital documents limit.
   const DOCUMENT_LIMIT = 30;

   if (!selectedUserId && !userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'Invalid user and selected user id',
      });
   }

   const chatMessages = await messageModel.aggregate([
      {
         $match: {
            users: {
               $all: [
                  mongoose.Types.ObjectId(userId),
                  mongoose.Types.ObjectId(selectedUserId),
               ],
            },
         },
      },
      {
         $project: {
            _id: 1,
            users: 1,
            messages: 1,
            totalMessagesCount: { $size: '$messages' },
            createdAt: 1,
         },
      },
      { $unwind: '$messages' },
      {
         $lookup: {
            from: 'auths',
            localField: 'messages.sender',
            foreignField: '_id',
            as: 'messages.senderInfo',
         },
      },
      { $unwind: '$messages.senderInfo' },
      {
         $project: {
            _id: 1,
            users: 1,
            createdAt: 1,
            'messages.message': 1,
            'messages.sender': 1,
            'messages.onlyEmogi': 1,
            'messages._id': 1,
            'messages.createdAt': 1,
            'messages.giphy': 1,
            'messages.name': '$messages.senderInfo.name',
            'messages.avatar': '$messages.senderInfo.avatar',
            totaltotalMessagesCount: '$totalMessagesCount',
            totalPages: {
               $abs: {
                  $ceil: { $divide: ['$totalMessagesCount', DOCUMENT_LIMIT] },
               },
            },
         },
      },
      { $sort: { 'messages.createdAt': -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      { $sort: { 'messages.createdAt': 1 } },
      {
         $group: {
            _id: {
               _id: '$_id',
               users: '$users',
               totalPages: { $subtract: ['$totalPages', 1] },
               totaltotalMessagesCount: '$totaltotalMessagesCount',
            },
            Messages: {
               $push: {
                  avatar: '$messages.avatar',
                  _id: '$messages._id',
                  message: '$messages.message',
                  sender: '$messages.sender',
                  createdAt: '$messages.createdAt',
                  name: '$messages.name',
                  giphy: '$messages.giphy',
                  onlyEmogi: '$messages.onlyEmogi',
               },
            },
         },
      },
   ]);

   if (chatMessages) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         chats: chatMessages,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         error: true,
         success: false,
         message: 'Internal server error',
      });
   }
});

const getUsersAvatars = catchAsync(async function (req, res, next) {
   const findAllAvatar = await avatarModel.find({}, { url: 1 });

   if (findAllAvatar) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         avatars: findAllAvatar,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

const getAllCategory = catchAsync(async function (req, res, next) {
   const allCategory = await gameCategoryModel.find(
      {},
      { name: 1, pageLink: 1 }
   );
   if (allCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         allCategory,
      });
   }
   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getGamesEnableCategory = catchAsync(async function (req, res, next) {
   const category = await gameCategoryModel.aggregate([
      { $match: { showCategory: true } },
      { $unwind: '$games' },
      {
         $lookup: {
            from: 'games',
            localField: 'games.gameId',
            foreignField: '_id',
            as: 'games.game',
         },
      },
      { $unwind: '$games.game' },
      {
         $project: {
            _id: 1,
            name: 1,
            game: {
               name: '$games.game.name',
               _id: '$games.game._id',
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
            },
            games: {
               $push: '$game',
            },
         },
      },
      {
         $project: {
            category: '$_id',
            _id: 0,
            games: '$games',
         },
      },
   ]);

   if (category) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         gameCategories: category,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const setUserSelectedCurrency = catchAsync(async function (req, res, next) {
   const { userId, currencyId, currencyType, crSymbol } = req.body;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is reuqired',
      });
   }

   const updateObject = {
      currencyType,
   };

   if (!!crSymbol) {
      updateObject.crSymbol = crSymbol;
   }

   if (!!currencyId) {
      updateObject.currencyId = currencyId;
   }

   const findUserSettingsAndUpdate = await userSettingModel.updateOne(
      { userId },
      {
         $set: {
            selectedCurrency: updateObject,
         },
      }
   );

   if (findUserSettingsAndUpdate.modifiedCount) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'User selected currency saved.',
         data: req.body,
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      message: 'No changes.',
   });
});

const getUserSelectedCurrency = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is reuqired',
      });
   }

   const selectedCurrency = await userSettingModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
         $project: {
            currencyType: '$selectedCurrency.currencyType',
            currencyId: '$selectedCurrency.currencyId',
            crSymbol: '$selectedCurrency.crSymbol',
            _id: 0,
         },
      },
   ]);

   if (selectedCurrency) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         currency: selectedCurrency?.[0] || {},
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

module.exports = {
   getUserInformation,
   updateUserName,
   updateAvatarHandler,
   getAllMadels,
   getSelectedUserInfo,
   updateUserPrivacy,
   getPrivacyFieldStatus,
   getFriendRequestList,
   getFriendList,
   getPrivateMessages,
   getUsersAvatars,
   getAllCategory,
   getGamesEnableCategory,
   setUserSelectedCurrency,
   getUserSelectedCurrency,
};
