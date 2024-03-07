var express = require('express');
var router = express.Router();

const purchasesController = require('../controllers/purchases');

router.get('/purchases/new', purchasesController.new);

router.post('/raw', purchasesController.create);

module.exports = router;