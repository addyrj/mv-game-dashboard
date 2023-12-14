const {
   catchAsync,
   httpStatusCodes,
   genrateAccessToken,
   genrateRefreshToken,
   checkIsValidId,
} = require('../helper/helper');
const bcryptjs = require('bcryptjs');

const authModel = require('../model/schema/authSchema');
const roleModel = require('../model/schema/roleSchema');
const { addActivity } = require('../helper/activityHandler');

const getUserAcocunInfo = function (data) {
   const accessToken = genrateAccessToken({
      _id: data._id,
      userId: data?.userId,
   });
   const refreshToken = genrateRefreshToken({
      _id: data._id,
   });

   return { accessToken, refreshToken };
};

const login = catchAsync(async function (req, res, next) {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${(!email && 'Email') || (!password && 'Password')} is required`,
      });
   }

   // find user account.
   const user = await authModel.aggregate([
      { $match: { email: email.toLowerCase() } },
      { $unwind: { path: '$userRole', preserveNullAndEmptyArrays: true } },
      {
         $lookup: {
            from: 'roles',
            localField: 'userRole.roleId',
            foreignField: '_id',
            as: 'userRole.role',
            pipeline: [{ $project: { roleName: 1 } }],
         },
      },
      { $unwind: { path: '$userRole.role', preserveNullAndEmptyArrays: true } },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
               email: '$email',
               avatar: '$avatar',
               userId: '$userId',
               active: '$active',
               accountEnable: '$accountEnable',
               password: '$password',
            },
            roles: { $push: '$userRole.role' },
         },
      },
      { $project: { _id: 0, item: '$_id', roles: 1 } },
   ]);

   const userInfo = user?.[0];

   if (!userInfo) {
      return res.status(httpStatusCodes.OK).json({
         error: true,
         success: false,
         message: 'User email is not exists!',
      });
   }

   if (!userInfo?.item?.password) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Account has no password',
      });
   }

   if (!userInfo?.item?.accountEnable) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Your account is disable right now',
      });
   }

   // match the password
   const varifyPassword = await bcryptjs.compare(password, userInfo?.item.password);

   if (!varifyPassword) {
      return res.status(httpStatusCodes.OK).json({
         error: true,
         success: false,
         message: 'Account password is not match',
      });
   }

   if (userInfo?.item.active && varifyPassword) {
      // check user has valid roles to login into the dashboard or not.
      const rolesAr = userInfo?.roles.map((el) => ({ roleName: el?.roleName }));

      if (!rolesAr) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: true,
            message: 'Account has no roles permissions',
         });
      }

      if (!!rolesAr && rolesAr?.length) {
         const isUser = rolesAr.some((el) => el?.roleName === 'user');

         if (isUser && rolesAr.length === 1) {
            return res.status(httpStatusCodes.OK).json({
               success: false,
               error: true,
               message: 'Account has no permissions',
            });
         } else {
            const authObject = {
               email: userInfo?.item?.email,
               name: userInfo?.item?.name,
               avatar: userInfo?.item?.avatar,
               userId: userInfo?.item?.userId,
               _id: userInfo?.item?._id,
            };

            const { accessToken, refreshToken } = getUserAcocunInfo(authObject);
            const time = new Date();
            await addActivity({
               userId: userInfo?.item?.userId, 
               type: 'admin logged in',
               action: `admin logged in at ${time}`,
               createdAt: time,
               createdById: userInfo?.item?.userId
            });

            return res.status(httpStatusCodes.CREATED).json({
               error: false,
               success: true,
               user: authObject,
               accessToken,
               refreshToken,
               roles: rolesAr,
            });
         }
      }
   } else {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Account is not varify, please first active the account then login',
      });
   }
});

const genrateUserAccessToken = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected id is not valid id please check.',
      });
   }

   const accessToken = genrateAccessToken({ _id: userId });

   return res.status(httpStatusCodes.OK).json({
      error: false,
      success: true,
      accessToken,
   });
});

module.exports = {
   login,
   genrateUserAccessToken,
};
