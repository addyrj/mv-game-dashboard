const exporess = require('express');
const router = exporess.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const userManagementController = require('../controllers/userManagementController');
const { createPlayerAccount } = require('../middlewares/userManagementValidator');

// API => GET
router.get('/get-single-user-account', varifyJwtToken, userManagementController.getUserSingleAccount);
router.get('/get-user-account-information', varifyJwtToken, userManagementController.getUserSingleAccountInformation);
router.get('/get-all-global-chat-groups', varifyJwtToken, userManagementController.getAllGlobalGroups);
router.get('/get-user-global-chats', varifyJwtToken, userManagementController.getUserGlobalChats);
router.get('/get-user-wagered-amount', varifyJwtToken, userManagementController.getUserWageredAmountGraph);
router.get('/get-user-roles-lists', varifyJwtToken, userManagementController.getUserRoleLists);
router.get('/get-user-by-roles', varifyJwtToken, userManagementController.getUserByRoles);

// API => POST
router.post(
   '/create-player-account',
   varifyJwtToken,
   createPlayerAccount,
   userManagementController.createPlayerAccount
);

// API => PATCH
router.patch(
   '/update-player-account',
   varifyJwtToken,
   createPlayerAccount,
   userManagementController.updatePlayerAccount
);
router.patch('/set-account-password', varifyJwtToken, userManagementController.setAccountPassword);

// API => DELETE

module.exports = router;
