var express = require('express');
var router = express.Router();
var gamesCtrl = require('../controllers/games');

router.get('/:id', gamesCtrl.show);

module.exports = router;