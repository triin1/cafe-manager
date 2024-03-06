var express = require('express');
var router = express.Router();

const outputsController = require('../controllers/outputs');


// GET /outputs/new
router.get('/outputs/new', outputsController.new);

// POST /inventories
router.post('/finished', outputsController.create);

module.exports = router;