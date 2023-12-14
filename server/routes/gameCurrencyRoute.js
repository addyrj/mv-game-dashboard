const express = require('express');
const router = express.Router();
const { upload } = require('../helper/helper');
// const { currencyValidator } = require('../middlewares/DocumentValidator');
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const gameCurrencyController = require('../controllers/gameCurrencyController');

// API => GET
router.get('/get-game-currency', varifyJwtToken, gameCurrencyController.getAllGameCurrency);
router.get('/get-single-game-currency', varifyJwtToken, gameCurrencyController.getSingleGameCurrency);
router.get('/get-all-currency-list', varifyJwtToken, gameCurrencyController.getAllCurrencyList);
router.get('/get-game-currency-list', varifyJwtToken, gameCurrencyController.getAllGameCurrencyList);

// API => POST
router.post(
   '/insert-currency',
   varifyJwtToken,
   upload.single('file'),
   // currencyValidator,
   gameCurrencyController.insertGamesCurrency
);

// API => PATCH
router.patch('/update-single-currency', varifyJwtToken, upload.single('file'), gameCurrencyController.updateSingleGameCurrency);

// API => DELETE
router.delete('/delete-single-game-currency', varifyJwtToken, gameCurrencyController.deleteSingleGameCurrency);

module.exports = router;
