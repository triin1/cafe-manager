var express = require('express');
var router = express.Router();

const outputsController = require('../controllers/outputs');

router.get('/outputs/new', outputsController.new);

router.post('/finished', outputsController.create);

module.exports = router;