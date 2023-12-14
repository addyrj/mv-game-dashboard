const express = require('express');
const {
   varifyJwtToken,
   varifyGameToken,
   validGameScrectKey,
} = require('../helper/jwtHelper');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// API => GET
router.get(
   '/get-user-wallet-currency',
   varifyJwtToken,
   paymentController.getFaitCurrencyListsWithAmount
);
router.get(
   '/get-selected-currency-payment-options',
   varifyJwtToken,
   paymentController.getSelectedCurrencyPaymentOptions
);
router.get(
   '/get-selected-currency-amount',
   varifyJwtToken,
   paymentController.getUserSelectedGameCurrency
);
router.get(
   '/get-user-all-fiat-currency-info',
   varifyJwtToken,
   paymentController.getUserAllFiatCurrency
);
router.get(
   '/get-selected-game-currency',
   varifyJwtToken,
   paymentController.getUserSelectedGameCurrency
);
router.get(
   '/get-user-fiat-currency-transaction',
   paymentController.getUserFiatCurrencyTransaction
);
router.get(
   '/get-user-fiat-deposit-transaction',
   varifyJwtToken,
   paymentController.getUserFiatTransaction
);
router.get(
   '/get-selected-transaction-info',
   varifyJwtToken,
   paymentController.getSelectedTransactionInfo
);
router.get(
   '/get-selected-payment-fileds',
   varifyJwtToken,
   paymentController.getSelectedPaymentFields
);
router.get(
   '/get-user-fiat-withdraw-transaction',
   varifyJwtToken,
   paymentController.getUserFiatWithdrawTransactions
);

// API => POST
router.post('/paytem-payment', paymentController.paytemPayment);
router.post(
   '/create-fiat-payment-transaction',
   varifyJwtToken,
   paymentController.fiatPaymentTransaction
);
router.post(
   '/make-user-fiat-withdraw-transaction',
   varifyJwtToken,
   paymentController.makeUserFiatWithdrawTransaction
);
router.post(
   '/update-user-crypto-deposit-transaction',
   paymentController.updateUserCryptoDepositTransaction
);
router.post(
   '/update-user-game-bet-currency',
   validGameScrectKey,
   paymentController.updateUserGameBetCurrency
);

// PATCH
router.patch(
   '/update-user-payment-transaction',
   paymentController.updateUserPaymentTransaction
);
router.patch(
   '/bet-result-transactions',
   validGameScrectKey,
   paymentController.betResultTransaction
);

module.exports = router;
