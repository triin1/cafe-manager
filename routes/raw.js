var express = require('express');
var router = express.Router();

const rawInventoriesController = require('../controllers/raw');

router.get('/raw', rawInventoriesController.index);

module.exports = router;