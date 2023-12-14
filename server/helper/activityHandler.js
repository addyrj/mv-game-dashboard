const ActivityModel = require('../model/schema/activityMonitorSchema');

const addActivity = async (data) => {
  return await ActivityModel.create(data);
}

module.exports = {
  addActivity
};