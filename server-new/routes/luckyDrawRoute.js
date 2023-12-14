const express = require('express');
const router = express.Router();
const luckyDrawController = require('../controllers/luckyDrawController');
const { varifyJwtToken } = require('../helper/jwtHelper');

// API => GET
router.get(
   '/get-user-daily-spin-information',
   // varifyJwtToken,
   luckyDrawController.getUserDailySpinInfo
);
router.get('/get-spin-draw', luckyDrawController.getEnableDraw);
router.get(
   '/get-lucky-spin-draw-info',
   luckyDrawController.getLuckSpinDrawInfo
);

// API => POST
router.post(
   '/get-lucky-draw-amount',
   varifyJwtToken,
   luckyDrawController.getUserLuckyDrawAmount
);

module.exports = router;
