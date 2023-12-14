const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { jwtRefreshTokenVarification } = require('../helper/helper');

// API => POST
router.post('/login', authController.login);
router.post('/refresh-token', jwtRefreshTokenVarification, authController.genrateUserAccessToken);

module.exports = router;
