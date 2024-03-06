var express = require('express');
var router = express.Router();

const finishedInventoriesController = require('../controllers/finished');

// GET /finished/index
router.get('/finished', finishedInventoriesController.index);

module.exports = router;