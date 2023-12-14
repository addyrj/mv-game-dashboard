const express = require('express');
const router = express.Router();
const { userRoleValidator } = require('../middlewares/DocumentValidator');
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const userRolesController = require('../controllers/userRolesController');

// API => GET
router.get('/get-all-user-rools', varifyJwtToken, userRolesController.getAllUserRoles);
router.get('/get-single-user-role', varifyJwtToken, userRolesController.getSingleUserRole);
router.get('/get-roles', varifyJwtToken, userRolesController.getUserRole);

// API => POST
router.post('/insert-new-user-role', varifyJwtToken, userRoleValidator, userRolesController.insertNewUsersRole);

// API => PATCH
router.patch('/update-single-role', varifyJwtToken, userRoleValidator, userRolesController.updateSingleRole);

// API => DELETE
router.delete('/delete-single-role', varifyJwtToken, userRolesController.deleteUserSingleRole);

module.exports = router;
