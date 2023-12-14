const express = require('express');
const activityController = require('../controllers/activityController');
const router = express.Router();

router.get('/get-admin-activity', varifyJwtToken, activityController.getAdminActivity);
router.get('/get-sub-admin-activity', varifyJwtToken, activityController.getSubAdminActivity);
router.get('/get-support-activity', varifyJwtToken, activityController.getSupportActivity);
router.get('/get-user-activity', varifyJwtToken, activityController.getUserActivity);

module.exports = router;