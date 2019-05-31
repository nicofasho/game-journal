var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', isLoggedIn, usersCtrl.index);

router.get('/:name', isLoggedIn, usersCtrl.show);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
