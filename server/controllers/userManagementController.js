const { catchAsync, httpStatusCodes, uploadToS3, checkIsValidId } = require('../helper/helper');
const bcryptjs = require('bcryptjs');
const otpGenerator = require('otp-generator');
const axios = require('axios');
const { default: mongoose } = require('mongoose');
const {addActivity} = require('../helper/activityHandler');

const authModel = require('../model/schema/authSchema');
const roleModel = require('../model/schema/roleSchema');
const walletModel = require('../model/schema/walletSchema');
const currencyModel = require('../model/schema/currencySchema');
const userSettingModel = require('../model/schema/userSettingSchema');
const userSocialNetworkSchema = require('../model/schema/userSocialNetworkSchema');
const userHistoryModel = require('../model/schema/userHistorySchema');
const userProgressModel = require('../model/schema/userProgressSchema');
const groupModel = require('../model/schema/groupSchema');
const transactionModel = require('../model/schema/transactionSchema');

const getUserSingleAccount = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is required',
      });
   }

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const findUserAccount = await authModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      { $unwind: { path: '$userRole', preserveNullAndEmptyArrays: true } },
      {
         $lookup: {
            from: 'roles',
            localField: 'userRole.roleId',
            foreignField: '_id',
            as: 'role',
            pipeline: [{ $project: { _id: 1, roleName: 1 } }],
         },
      },
      { $project: { avatar: 1, role: 1, name: 1, email: 1, active: 1, accountEnable: 1 } },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
               email: '$email',
               active: '$active',
               avatar: '$avatar',
               accountEnable: '$accountEnable',
            },
            roles: { $push: { $arrayElemAt: ['$role', 0] } },
         },
      },
      { $project: { _id: 0, roles: 1, item: '$_id' } },
   ]);

   const userInfo = findUserAccount?.[0];

   if (userInfo) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: userInfo,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Account not found!',
   });
});

const createPlayerAccount = catchAsync(async function (req, res, next) {
   const { name, email, active, avatar, accountEnable, roles } = req.body;

   if (!name || !email || !active) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${(!name && 'name') || (!email && 'email') || (!active && 'active')} is required`,
      });
   }

   if (!roles || !roles.length) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Roles is reuqired field',
      });
   }

   // check user email is exists or not.
   const findUserEmailIsExists = await authModel.findOne({
      email: email.toLowerCase(),
   });

   if (findUserEmailIsExists) {
      return res.status(httpStatusCodes.OK).json({
         error: true,
         success: false,
         message: 'Email already used',
      });
   } else {
      // genrate user otp
      const otp = otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         specialChars: false,
      });

      const allCurrency = await currencyModel.find({}, { currencyName: 1 });

      if (!allCurrency) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Internal server error',
         });
      }

      // genrate user id
      const _id = mongoose.Types.ObjectId();

      let walletArray = allCurrency.map((el) => ({
         currencyId: el?._id,
         balance: mongoose.Types.Decimal128.fromString('0.000000'),
      }));

      // check user wallet is already created or not.
      const isUserWalletAlreadyExists = await walletModel.findOne({
         userId: _id,
      });

      if (isUserWalletAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: false,
            message: 'Please use different account to login.',
         });
      }

      const createUserWallet = await walletModel({
         userId: _id,
         userWallet: walletArray,
      }).save();

      if (!createUserWallet) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Someting worng with creating user wallet.',
         });
      }

      if (createUserWallet) {
         // genrate unique user id
         const totalUsers = await authModel.countDocuments();
         const userId = totalUsers + Number(process.env.COLLECTION_STATE_COUNT);

         const createUserSettingDoc = await userSettingModel({
            userId: _id,
         }).save();

         if (!createUserSettingDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user setting document.',
            });
         }

         const createUserSocialNetworkDocument = await userSocialNetworkSchema({
            userId: _id,
         }).save();

         if (!createUserSocialNetworkDocument) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user social network document.',
            });
         }

         const createUserHistoryDoc = await userHistoryModel({
            userId: _id,
         }).save();

         if (!createUserHistoryDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user history document.',
            });
         }

         const createUserprogressDocument = await userProgressModel({
            userId: _id,
         }).save();

         if (!createUserprogressDocument) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user progress document.',
            });
         }

         const rolesAr = roles.map((el) => ({
            roleId: el?._id,
            _id: mongoose.Types.ObjectId(),
         }));

         // store user information into the database
         const storeUserInfo = await authModel({
            _id,
            email,
            userId,
            name,
            active,
            avatar: avatar || process.env.DEFAULT_IMAGE,
            otp,
            userRole: rolesAr,
            coins: [
               {
                  coin: 'Gold',
                  balance: 1000,
               },
            ],
            walletId: createUserWallet._id,
            accountEnable,
            createdBy: 'admin',
         });

         // save user information
         const saveInfo = await storeUserInfo.save();

         if (!saveInfo) {
            throw Error('someting worng with creating user document');
         }

         await axios.post(`${process.env.CRYPTO_PAYMENT_SERVER}/testnet/addUser`, { userId: storeUserInfo?.userId });

         // create admin activity
         const time = new Date();
         await addActivity({
            userId: _id, 
            type: 'New User',
            action: `admin created new User Account`,
            createdAt: time,
            createdById: req.userId
         });
         
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            message: 'Player account created',
         });
      }
   }
});

const updatePlayerAccount = catchAsync(async function (req, res, next) {
   const { userId, name, email, active, avatar, accountEnable, roles } = req.body;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is required',
      });
   }

   if (!roles || !roles.length) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Roles is reuqired field',
      });
   }

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   if (!roles) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Roles is reuqired field',
      });
   }

   let userRole = [];
   if (!!roles && roles.length) {
      userRole = roles.map((el) => ({ roleId: el?._id, roleName: el?.roleName }));
   }

   console.log(userRole);

   const findAndUpdateInfo = await authModel.updateOne(
      { _id: userId },
      {
         $set: {
            name,
            email,
            active,
            avatar,
            accountEnable,
            userRole,
         },
      }
   );

   if (findAndUpdateInfo?.modifiedCount) {
      if (!accountEnable) {
         // if the user account is disable then send the socket event the client user.
         const response = await axios.post(
            `${process.env.WEB_APP_BACKEND_URL}/userManagement/logout-client-user?secret=${process.env.API_SCRECT}`,
            {
               userId,
               accountEnable,
            }
         );
      }
      
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: userId, 
         type: 'updated User',
         action: `admin updated User Account`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Account updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const setAccountPassword = catchAsync(async function (req, res, next) {
   const { password, accountId } = req.body;

   if (!password || !accountId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${(!password && 'password') || (!accountId && 'account id')} is required`,
      });
   }

   const findUserAccount = await authModel.findOne({ _id: accountId });

   if (!findUserAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Account is not found!',
      });
   }

   if (!!findUserAccount && findUserAccount?.password) {
      // match the password
      const varifyPassword = await bcryptjs.compare(password, findUserAccount.password);

      if (varifyPassword) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            error: true,
            success: false,
            message: 'Older password and new password is same.',
         });
      }
   }

   const hashPassword = await bcryptjs.hash(password, 11);

   const updatePassword = await authModel.updateOne(
      { _id: accountId },
      {
         $set: {
            password: hashPassword,
         },
      }
   );

   if (updatePassword?.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: accountId, 
         type: 'User password created',
         action: `admin created User Account password`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Account password changed',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const getUserSingleAccountInformation = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is required',
      });
   }

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const userStatus = await authModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      { $unwind: { path: '$userRole', preserveNullAndEmptyArrays: true } },
      {
         $lookup: {
            from: 'roles',
            localField: 'userRole.roleId',
            foreignField: '_id',
            as: 'userRole',
         },
      },
      { $unwind: { path: '$userRole', preserveNullAndEmptyArrays: true } },
      {
         $project: {
            name: 1,
            email: 1,
            avatar: 1,
            userId: 1,
            userRole: {
               roleName: 1,
            },
            active: 1,
            createdAt: 1,
            createdBy: 1,
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
               email: '$email',
               avatar: '$avatar',
               userId: '$userId',
               active: '$active',
               createdAt: '$createdAt',
               createdBy: '$createdBy',
            },
            roles: { $push: '$userRole' },
         },
      },
      { $project: { _id: 0, item: '$_id', roles: 1 } },
   ]);

   const data = userStatus?.[0];

   if (data) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         data: data,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Account is not found!',
   });
});

const getAllGlobalGroups = catchAsync(async function (req, res, next) {
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

const getUserGlobalChats = catchAsync(async function (req, res, next) {
   const { userId, groupId, page } = req.query;

   if (!userId || !groupId || !page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${(!userId && 'User') || (!groupId && 'Group') || (!page && 'page')} id is reuqired`,
      });
   }

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const DOCUMENT_LIMIT = 30;

   const totalDocuments = await groupModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(groupId) } },
      { $unwind: '$groupMessages' },
      { $match: { 'groupMessages.userId': mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, count: { $sum: 1 } } },
   ]);

   const groupChats = await groupModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(groupId) } },
      {
         $project: {
            _id: 1,
            groupName: 1,
            groupMessages: 1,
         },
      },
      { $unwind: '$groupMessages' },
      { $match: { 'groupMessages.userId': mongoose.Types.ObjectId(userId) } },
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
         $project: {
            groupId: '$_id',
            groupName: 1,
            avatar: '$groupMessages.user.avatar',
            createdAt: '$groupMessages.createdAt',
            _id: '$groupMessages._id',
            message: '$groupMessages.message',
            userId: '$groupMessages.userId',
            name: '$groupMessages.user.name',
            gifphy: '$groupMessages.giphy',
            onlyEmogi: '$groupMessages.onlyEmogi',
         },
      },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $group: {
            _id: {
               _id: '$groupId',
               groupName: '$groupName',
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

   const chats = groupChats?.[0];
   const count = totalDocuments?.[0]?.count;

   if (chats) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         chats,
         page: +page,
         totalPages: Math.ceil(count / DOCUMENT_LIMIT - 1),
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      chats: {},
   });
});

const getUserWageredAmountGraph = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${!userId && 'User'} id is reuqired`,
      });
   }

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const wageredData = await transactionModel.aggregate([
      { $match: { $and: [{ userId: mongoose.Types.ObjectId(userId) }, { transactionType: 'gameWageredAmount' }] } },
      { $sort: { createdAt: 1 } },
      {
         $project: {
            _id: 0,
            amount: {
               $convert: {
                  input: '$amount',
                  to: 'int',
               },
            },
            transactionType: 1,
         },
      },
   ]);

   if (wageredData) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: wageredData,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

const getUserRoleLists = catchAsync(async function (req, res, next) {
   const findAllRoles = await roleModel.find({}, { roleName: 1 });
   if (!findAllRoles) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         success: false,
         error: true,
         message: 'Roles data is not found!',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      items: findAllRoles,
   });
});

const getUserByRoles = catchAsync(async function (req, res, next) {
   const { filter } = req.query;

   if (!filter) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'role filter is required',
      });
   }

   const findRole = await roleModel.findOne({ roleName: filter }, { roleName: 1 });
   const roleId = findRole?._id;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Role is not found',
      });
   }

   const findUsers = await authModel.aggregate([
      {
         $project: {
            name: 1,
            email: 1,
            avatar: 1,
            userId: 1,
            username: 1,
            filteredArray: {
               $filter: {
                  input: '$userRole',
                  as: 'item',
                  cond: {
                     $eq: ['$$item.roleId', mongoose.Types.ObjectId(roleId)],
                  },
               },
            },
         },
      },
      { $match: { filteredArray: { $ne: [] } } },
      { $project: { filteredArray: 0 } },
   ]);

   if (findUsers) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         users: findUsers,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

module.exports = {
   getUserSingleAccount,
   createPlayerAccount,
   updatePlayerAccount,
   setAccountPassword,
   getUserSingleAccountInformation,
   getAllGlobalGroups,
   getUserGlobalChats,
   getUserWageredAmountGraph,
   getUserRoleLists,
   getUserByRoles,
};
