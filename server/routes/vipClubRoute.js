const express = require('express');
const router = express.Router();
const vipClubController = require('../controllers/vipClubController');
const { body, validationResult } = require('express-validator');

////////////////GET
router.get('/get-all', vipClubController.findAllVipClub);
router.get('get/:id', vipClubController.findOneVipClub);
router.get('/currency/get', vipClubController.currencyList);

////////////////POST
router.post(
    '/create',
    [
        body('userRole')
            .trim()
            .not()
            .isEmpty()
            .withMessage('provide a valid role'),
        body('reward')
            .trim()
            .not()
            .isEmpty(),
        body('amount')
            .trim()
            .not()
    ], vipClubController.insertVipClub);

////////////////////PUT
router.put('/update/:id', vipClubController.updateVipClub);

////////////////////DELETE
router.delete('delete/:id', vipClubController.deleteVipClub);

module.exports = router;