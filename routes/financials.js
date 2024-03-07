var express = require('express');
var router = express.Router();

const financialsController = require('../controllers/financials');

router.get('/financials', financialsController.index);

module.exports = router;