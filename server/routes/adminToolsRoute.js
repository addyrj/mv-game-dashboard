const express = require('express');
const router = express.Router();
const adminToolsControllers = require('../controllers/adminToolsController');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

// Api => GET
router.get('/get-game-collection-no-populate-data', varifyJwtToken, adminToolsControllers.exportGameCollectionNoPopulateData);
router.get('/get-game-collection-all-data', varifyJwtToken, adminToolsControllers.exportGameAllData);
router.get('/get-game-category-collection-with-game-data', varifyJwtToken, adminToolsControllers.getCollectionDataWithCategoryList);
router.get('/get-all-providers-data', varifyJwtToken, adminToolsControllers.getAllProvidersData);

module.exports = router;
