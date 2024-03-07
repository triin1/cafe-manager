var express = require('express');
var router = express.Router();

const salesController = require('../controllers/sales');

router.get('/finished/:id/sales/new', salesController.new);

router.post('/financials', salesController.create);

module.exports = router;