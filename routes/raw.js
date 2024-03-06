var express = require('express');
var router = express.Router();

const rawInventoriesController = require('../controllers/raw');

// GET /raw/index
router.get('/raw', rawInventoriesController.index);

module.exports = router;