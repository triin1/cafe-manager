var express = require('express');
var router = express.Router();

const salesController = require('../controllers/sales');

// GET /finished/:id/sales/new
router.get('/finished/:id/sales/new', salesController.new);

// post /financials
router.post('/financials', salesController.create);

module.exports = router;