const express = require('express');
const router = express.Router();
const filesController = require('../controllers/files.controller');

router.get('/:fileName', filesController.getFile);

router.post('/upload', filesController.uploadFile);

module.exports = router;