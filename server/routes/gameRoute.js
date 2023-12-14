const express = require('express');
const router = express.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const gameController = require('../controllers/gameController');
const { upload } = require('../helper/helper');

// API => GET
router.get('/get-games', varifyJwtToken, gameController.getGames);
router.get('/get-single-game', varifyJwtToken, gameController.getSingleGameInfo);
router.get('/get-top-favorite-games', varifyJwtToken, gameController.getTopFavoriteGames);
router.get('/get-all-games-category', varifyJwtToken, gameController.getAllGameCategory);
router.get('/get-games-all-category', varifyJwtToken, gameController.getAllGamesCategroy);
router.get('/get-games-providers-lists', varifyJwtToken, gameController.getGameProvidersList);
router.get('/get-single-game-category', varifyJwtToken, gameController.getSinglegameCategory);

// API => POST
router.post('/insert-new-game', varifyJwtToken, upload.any(), gameController.insertNewGame);
router.post('/post-new-game-category', varifyJwtToken, gameController.postNewGameCategory);

// API => PATCH
router.patch('/update-single-game', varifyJwtToken, upload.any(), gameController?.updateSingleGame);
router.patch('/update-game-category', varifyJwtToken, gameController.updateGameCategory);

// API => DELETE
router.delete('/delete-single-game', varifyJwtToken, gameController.deleteSingleGame);
router.delete('/delete-single-game-categroy', varifyJwtToken, gameController.deleteSingleGameCategory);

module.exports = router;
