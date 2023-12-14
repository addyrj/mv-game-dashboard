const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// API => GET
router.get(
   '/get-all-system-notification',
   notificationController.getAllSystemNotifications
);

module.exports = router;
