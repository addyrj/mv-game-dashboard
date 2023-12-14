const { catchAsync, httpStatusCodes } = require('../helper/helper');
const vipClubModel = require('../model/schema/vipClubSchema');
const {addActivity} = require('../helper/activityHandler');
const currencyModel = require('../model/schema/currencySchema');

const insertVipClub = catchAsync(async function (req, res, next) {
   const { userRole, reward, currency, amount, points, name, level } = req.body;

   if (userRole == 'Admin') {
      const existReward = await vipClubModel.findOne({ reward, amount, points }).lean();
      if (existReward?._id) {
         return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
            success: false,
            error: true,
            message: `reward with this details already exists`,
         });
      }

      createVipClub = await vipClubModel.create({
         userRole,
         reward,
         currency,
         amount,
         points,
         name,
         level,
      });

      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'New reward vip club',
         action: `admin created new reward in vip club`,
         createdAt: time,
         createdById: req.userId
      });

      res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: `vip club created successfully`,
         data: createVipClub,
      });
   }
   return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
      success: false,
      error: true,
      message: `User role is not admin`,
   });
});

const findAllVipClub = catchAsync(async function (req, res, next) {
   const page = +req.query.page || 1;
   const userRole = +req.query.userRole;
   const reward = +req.query.reward;
   const currency = +req.query.currency;
   const amount = +req.query.amount;
   const points = +req.query.points;
   const name = +req.query.name;
   const level = +req.query.level;

   const perPage = +req.query.perPage || 5;
   const skip = (page - 1) * perPage;
   const countData = await vipClubModel.find({}).countDocuments();
   const totalPage = Math.ceil(countData / perPage);

   const filter = {};
   if (userRole) {
      filter.userRole = userRole;
   }
   if (reward) {
      filter.reward = reward;
   }
   if (currency) {
      filter.currency = currency;
   }
   if (amount) {
      filter.amount = amount;
   }
   if (points) {
      filter.points = points;
   }
   if (name) {
      filter.name = name;
   }
   if (level) {
      filter.level = level;
   }

   const vipList = await vipClubModel.find(filter).populate('currency', 'currencyName').skip(skip).limit(perPage).sort({ updatedAt: -1 }).exec();

   if (findAllVipClub) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         vipList,
         currentPage: page,
         perPage: perPage,
         totalPage,
      });
   }
   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

const updateVipClub = catchAsync(async function (req, res, next) {
   const id = req.params.id;
   const { userRole, reward, currency, amount, points, name, level } = req.body;
   if (userRole == 'Admin' && id) {
      const findAllVipClub = await vipClubModel
         .findOneAndUpdate(
            { _id: id },
            {
               amount: amount,
               points: points,
               name: name,
               level: level,
               reward: reward,
               currency: currency,
               userRole: userRole,
            },
            { new: true },
         )
         .lean();
      console.log(findAllVipClub);

      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'Updated reward vip club',
         action: `admin updated a reward in vip club`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Updated successfully',
         data: findAllVipClub,
      });
   }
   return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
      success: false,
      error: true,
      message: `User role is not admin`,
   });
});

const findOneVipClub = catchAsync(async function (req, res, next) {
   const id = req.params.id;
   if (id) {
      const findOne = await vipClubModel.findOne({ id });
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         data: { findOne },
      });
   }
   return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
      success: false,
      error: true,
      message: `Invalid objectid.!!`,
   });
});

const deleteVipClub = catchAsync(async function (req, res, next) {
   const id = req.params.id;
   if (id) {
      await vipClubModel.remove({ id });

      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'delete reward vip club',
         action: `admin deleted a reward in vip club`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Deleted successfully',
      });
   }
   return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
      success: false,
      error: true,
      message: `Invalid objectid.!!`,
   });
});

const currencyList = catchAsync(async function (req, res, next) {
   const list = await currencyModel.find({}).lean();
   // console.log(list);
   if (list.length) {
      const currencyList = [];
      for (let x of list) {
         currencyList.push({ ...x, label: x.currencyName });
      }
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         currencyList,
      });
   }
   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

module.exports = {
   insertVipClub,
   findAllVipClub,
   updateVipClub,
   findOneVipClub,
   deleteVipClub,
   currencyList,
};
