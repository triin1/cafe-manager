var express = require('express');
var router = express.Router();

const inventoriesController = require('../controllers/inventories');

// GET /inventories/index
router.get('/inventories', inventoriesController.index);

module.exports = router;