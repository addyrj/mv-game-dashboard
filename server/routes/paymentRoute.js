const express = require('express');
const router = express.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const { upload } = require('../helper/helper');
const paymentController = require('../controllers/paymentController');
const { validatePaymentOptions } = require('../middlewares/DocumentValidator');

// API => GET
router.get('/get-currency-payment-options', varifyJwtToken, paymentController.getCurrencyPaymentOptions);
router.get('/get-single-currency-payment-method', varifyJwtToken, paymentController.getSinglePaymentCurrencyOption);
router.get('/get-all-payment-option-list', varifyJwtToken, paymentController.getAllPaymentOptionList);
router.get('/get-all-fiat-deposit-transactions', varifyJwtToken, paymentController.getAllFiatDepositTransactions);
router.get('/get-single-order-info', varifyJwtToken, paymentController.getSingleOrderInfo);
router.get('/get-all-payment-options-fields', varifyJwtToken, paymentController.getAllPaymentOptionFields);
router.get('/get-single-payment-option-field', varifyJwtToken, paymentController.getSinglePaymentOptionField);
router.get('/get-all-payment-options-field-list', varifyJwtToken, paymentController.getAllPaymentOptionFieldsList);
router.get('/get-all-fiat-withdraw-transaction', varifyJwtToken, paymentController.getAllFiatWithdrawTransaction);

// API => POST
router.post(
   '/insert-new-currency-payment-options',
   varifyJwtToken,
   validatePaymentOptions,
   upload.single('image'),
   paymentController.insertNewCurrencyPaymentOption
);
router.post('/create-new-payment-options-filed', varifyJwtToken, paymentController.createNewPaymentOptionField);

// API => PATCH
router.patch(
   '/update-single-payment-option',
   varifyJwtToken,
   validatePaymentOptions,
   upload.single('image'),
   paymentController.updatePaymentOption
);
router.patch('/update-single-payment-option-field', varifyJwtToken, paymentController.updatePaymentOptionField);
router.patch('/update-fiat-withdraw-transaction', varifyJwtToken, paymentController.updateFiatWithdrawTransaction);

// API => DELETE
router.delete('/delete-single-payment-filed', varifyJwtToken, paymentController.deletePaymentOptionsField);

module.exports = router;
