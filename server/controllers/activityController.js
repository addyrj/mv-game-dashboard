const ActivityModel = require('../model/schema/activityMonitorSchema');
const { catchAsync, httpStatusCodes, uploadToS3, checkIsValidId } = require('../helper/helper');

const getAdminActivity = catchAsync(async function (req, res, next) {
  const resp = await ActivityModel.find({ createdBy: 'admin' }).sort({ createdAt: -1 });

  if (resp) {
    return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      avatars: resp,
    });
  }

  return res.status(httpStatusCodes.NOT_FOUND).json({
    success: false,
    error: true,
    message: 'Not found',
  });
});

const getSubAdminActivity = catchAsync(async function (req, res, next) {
  const { creator } = req.query;
  const resp = await avatarModel.find({ createdBy: 'sub-admin', createdById: creator }).sort({ createdAt: -1 });

  if (resp) {
    return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      avatars: resp,
    });
  }

  return res.status(httpStatusCodes.NOT_FOUND).json({
    success: false,
    error: true,
    message: 'Not found',
  });
});

const getSupportActivity = catchAsync(async function (req, res, next) {
  const { creator } = req.query;
  const resp = await avatarModel.find({createdBy: 'support', createdById: creator }).sort({ createdAt: -1 });

  if (resp) {
    return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      avatars: resp,
    });
  }

  return res.status(httpStatusCodes.NOT_FOUND).json({
    success: false,
    error: true,
    message: 'Not found',
  });
});

const getUserActivity = catchAsync(async function (req, res, next) {
  const { creator } = req.query;
  const resp = await avatarModel.find({createdBy: 'user', createdById: creator }).sort({ createdAt: -1 });

  if (resp) {
    return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      avatars: resp,
    });
  }

  return res.status(httpStatusCodes.NOT_FOUND).json({
    success: false,
    error: true,
    message: 'Not found',
  });
});

module.exports = {
  getAdminActivity,
  getSubAdminActivity,
  getSupportActivity,
  getUserActivity
};