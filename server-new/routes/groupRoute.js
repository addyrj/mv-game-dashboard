const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { varifyJwtToken } = require('../helper/jwtHelper');

// API => GET
router.get('/get-chat-groups', varifyJwtToken, groupController.getChatGroups);
router.get('/get-groups-chats', varifyJwtToken, groupController.getGroupChats);

module.exports = router;
