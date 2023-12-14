const express = require('express');
const router = express.Router();
const liveSupportController = require('../controllers/liveSupportController');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

// API => GET
router.get('/get-all-query-users-list', varifyJwtToken, liveSupportController.getAllQueryUserLists);
router.get('/get-query-users-lists', varifyJwtToken, liveSupportController.getQueryUsersLists);
router.get('/get-support-team-user-info', varifyJwtToken, liveSupportController.getSupportTeamUserInfo);
router.get('/get-support-team-activities-users-lists', varifyJwtToken, liveSupportController.getSupportTeamActivities);
router.get('/get-support-team-feedbacks', varifyJwtToken, liveSupportController.getSupportTeamFeedbacks);
router.get('/get-support-team-conversion', varifyJwtToken, liveSupportController.getSupportTeamConversion);

// API => POST

// API => PATCH
router.patch('/updated-user-query', varifyJwtToken, liveSupportController.updatedUserQuery);
router.patch('/update-user-query-feedback', varifyJwtToken, liveSupportController.updateUserQueryFeedBack);

// API => DELETE
module.exports = router;
