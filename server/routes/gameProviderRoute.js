const express = require('express');
const { gameProviderDocValidation } = require('../middlewares/DocumentValidator');
const router = express.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const gameProviderController = require('../controllers/gameProviderController');
const { upload } = require('../helper/helper');

// API => GET
router.get('/get-games-providers', varifyJwtToken, gameProviderController.getAllGameProviders);
router.get('/get-single-game-provider', varifyJwtToken, gameProviderController.getSingleGameProvider);
router.get('/get-game-providers-games', varifyJwtToken, gameProviderController.getProvidersGames);

// API => POST
router.post('/create-new-game-provider', varifyJwtToken, upload.single('file'), gameProviderDocValidation, gameProviderController.createNewGameProvider);

// API => PATCH
router.patch('/update-game-provider', varifyJwtToken, upload.single('file'), gameProviderDocValidation, gameProviderController.updateGameProvider);
router.patch('/block-single-game-provider', varifyJwtToken, gameProviderController.blockSingleGameProvider);
router.patch('/unblock-single-game-provider', varifyJwtToken, gameProviderController.unblockSingleGameProvider);

module.exports = router;
