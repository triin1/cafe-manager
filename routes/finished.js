var express = require('express');
var router = express.Router();

const finishedInventoriesController = require('../controllers/finished');

router.get('/finished', finishedInventoriesController.index);

router.get('/finished/:id', finishedInventoriesController.show);

router.post('/finished/:id', finishedInventoriesController.create);

module.exports = router;