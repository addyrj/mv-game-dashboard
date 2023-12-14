const express = require('express');
const router = express.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const notificationController = require('../controllers/notificationController');

// API => GET
router.get('/get-all-system-notifications', varifyJwtToken, notificationController.getAllSystemNotification);
router.get('/get-single-notification-info', varifyJwtToken, notificationController.getSingleNotificationInfo);

// API => POST
router.post('/create-new-system-notification', varifyJwtToken, notificationController.createNewSystemNotification);

// API => PATCH
router.patch('/update-single-system-notification', varifyJwtToken, notificationController.updateSingleNotification);

// API => DELETE
router.delete('/delete-single-notification', varifyJwtToken, notificationController.deleteSingleNotification);

module.exports = router;
