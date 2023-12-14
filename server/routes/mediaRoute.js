const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const { upload } = require('../helper/helper');

// API => GET
router.get('/get-all-uploded-images', varifyJwtToken, mediaController.getAllUploadImages);

// API => POST
router.post('/upload-bulk-images', upload.array('images'), mediaController.uploadBulkImages);

// API => PATCH
router.patch('/replace-media-image', varifyJwtToken, upload.any(), mediaController.replaceMediaImage);

// API => DELETE
router.delete('/delete-media-files', varifyJwtToken, mediaController.deleteMediaFiles);

module.exports = router;
