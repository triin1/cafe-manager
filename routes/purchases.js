var express = require('express');
var router = express.Router();

const purchasesController = require('../controllers/purchases');

// GET /purchases/new
router.get('/purchases/new', purchasesController.new);

// POST /raw
router.post('/raw', purchasesController.create);

module.exports = router;