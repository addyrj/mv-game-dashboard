const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const { upload } = require('../helper/helper');
const { currencyValidator } = require('../middlewares/DocumentValidator');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

router.get('/get-avatars', varifyJwtToken, adminControllers.getUsersAvatars);
router.get('/get-all-login-users', varifyJwtToken, adminControllers.getAllUsers);
router.get('/get-games-upload-result', varifyJwtToken, adminControllers.getGamesUploadResult);
router.get('/get-games-result-filter-data', varifyJwtToken, adminControllers.filterGameUploadDataResult);
router.get('/get-user-login-results', varifyJwtToken, adminControllers.getUserLoginResults);

// API => POST
router.post('/insert-new-game-avatar', varifyJwtToken, upload.single('file'), adminControllers.insertGameAvatar);

// API => DELETE
router.delete('/delete-single-avatar', varifyJwtToken, adminControllers.deleteSingleAvatar);

module.exports = router;
