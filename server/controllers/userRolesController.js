const { default: mongoose } = require('mongoose');
const { catchAsync, httpStatusCodes, checkIsValidId } = require('../helper/helper');
const {addActivity} = require('../helper/activityHandler');
const authModel = require('../model/schema/authSchema');
const roleModel = require('../model/schema/roleSchema');

const getUserRole = catchAsync(async function (req, res, next) {
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
         message: 'User Id is not valid id please check.',
      });
   }

   const userRoles = await authModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      { $unwind: { path: '$userRole', preserveNullAndEmptyArrays: true } },
      {
         $lookup: {
            from: 'roles',
            localField: 'userRole.roleId',
            foreignField: '_id',
            as: 'role',
            pipeline: [{ $project: { _id: 0, roleName: 1 } }],
         },
      },
      { $project: { role: 1 } },
      { $group: { _id: '$_id', roles: { $push: { $arrayElemAt: ['$role', 0] } } } },
      { $project: { _id: 0, roles: 1 } },
   ]);

   const data = userRoles?.[0];

   if (data) {
      return res.status(httpStatusCodes.OK).json({
         items: (!!data && data?.roles) || [],
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Roles not found',
   });
});

const getAllUserRoles = catchAsync(async function (req, res, next) {
   /**
    * @param findAllRoles find all user roles from database.
    * @param DOCUMENT_LIMIT how many document we want to return back
    */
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'page number is required!',
      });
   }

   const DOCUMENT_LIMIT = 20;
   const documentCount = await roleModel.countDocuments();
   const findAllRoles = await roleModel
      .find({})
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findAllRoles) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documentCount,
         roles: findAllRoles,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'user role not found!',
   });
});

const getSingleUserRole = catchAsync(async function (req, res, next) {
   const { roleId } = req.query;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'user role id is required!',
      });
   }

   const findSingleRole = await roleModel.findOne({ _id: roleId });

   if (findSingleRole) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         role: findSingleRole,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'single role is not found',
   });
});

// insert user roles.
const insertNewUsersRole = catchAsync(async function (req, res, next) {
   const { roleName, description } = req.body;

   if (!roleName) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         message: 'user role name is required!',
      });
   }

   // check the user role is already exists or not.
   // if not then create new role
   const findUserRoleAlreadyExists = await roleModel.findOne({
      roleName,
   });

   if (findUserRoleAlreadyExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'User role already exists',
      });
   }

   const insertNewRole = await roleModel({
      roleName,
      description,
   }).save();

   if (insertNewRole) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'New user role',
         action: `admin created a new user role`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         role: insertNewRole,
         message: 'user role is created',
      });
   }
});

const updateSingleRole = catchAsync(async function (req, res, next) {
   const { roleId, roleName, description } = req.body;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'user role id is required!',
      });
   }

   // check role is exists or not.
   const findRoleDocument = await roleModel.findOne({ _id: roleId });

   if (!findRoleDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Role is not exists',
      });
   }

   if (findRoleDocument?.roleName !== roleName) {
      const checkRoleAlreadyExists = await roleModel.findOne({ roleName });

      if (checkRoleAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            message: 'user already exists',
         });
      }
   }

   const findUserRoleAndUpdate = await roleModel.updateOne(
      { _id: roleId },
      {
         $set: {
            roleName,
            description,
         },
      }
   );

   if (!!findUserRoleAndUpdate?.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'update user role',
         action: `admin updated a user role`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'user role is updated',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: false,
         message: 'No filed changes.',
      });
   }
});

const deleteUserSingleRole = catchAsync(async function (req, res, next) {
   const { roleId } = req.query;

   if (!roleId) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         message: 'Role id is required',
      });
   }

   // find the role and then delete
   // if the role id is invalid then send back the error respose.
   const findRoleAndRemove = await roleModel.deleteOne({ _id: roleId });

   if (!!findRoleAndRemove.deletedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'delete user role',
         action: `admin deleted a user role`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         roleId,
         message: 'user role is removed',
      });
   } else {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: true,
         message: 'Role is not found',
      });
   }
});

module.exports = {
   getUserRole,
   insertNewUsersRole,
   getAllUserRoles,
   deleteUserSingleRole,
   getSingleUserRole,
   updateSingleRole,
};
