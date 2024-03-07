var express = require('express');
var router = express.Router();

const finishedInventoriesController = require('../controllers/finished');

// GET /finished/index
router.get('/finished', finishedInventoriesController.index);

// get finished/:id
router.get('/finished/:id', finishedInventoriesController.show);

router.post('/finished/:id', finishedInventoriesController.create);

module.exports = router;