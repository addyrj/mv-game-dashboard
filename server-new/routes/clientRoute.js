const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { upload } = require('../helper/helper');
const { varifyJwtToken } = require('../helper/jwtHelper');
const { usernameUpdateValidator } = require('../middlewares/userValidator');

// API => GET
router.get(
   '/get-user-information',
   varifyJwtToken,
   clientController.getUserInformation
);
router.get('/get-all-madels', varifyJwtToken, clientController.getAllMadels);
router.get(
   '/get-selected-user-info',
   varifyJwtToken,
   clientController.getSelectedUserInfo
);
router.get(
   '/get-privacy-fileds-status',
   varifyJwtToken,
   clientController.getPrivacyFieldStatus
);
router.get(
   '/get-friend-request-list',
   varifyJwtToken,
   clientController.getFriendRequestList
);
router.get('/get-friends', varifyJwtToken, clientController.getFriendList);
router.get(
   '/get-private-messages',
   varifyJwtToken,
   clientController.getPrivateMessages
);
router.get(
   '/get-user-avatar',
   varifyJwtToken,
   clientController.getUsersAvatars
);
router.get('/get-all-category', clientController.getAllCategory);
router.get('/get-games-category', clientController.getGamesEnableCategory);
router.get(
   '/get-user-selected-currency',
   varifyJwtToken,
   clientController.getUserSelectedCurrency
);

// API => POST
router.post(
   '/update-avatar',
   upload.any(),
   clientController.updateAvatarHandler
);

// API => PATCH
router.patch(
   '/update-username',
   varifyJwtToken,
   usernameUpdateValidator,
   clientController.updateUserName
);
router.patch(
   '/update-privacy',
   varifyJwtToken,
   clientController.updateUserPrivacy
);
router.patch(
   '/set-selected-currency',
   varifyJwtToken,
   clientController.setUserSelectedCurrency
);

module.exports = router;
