var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts');

// GET /posts
router.get('/', postsCtrl.index);

// show a post
router.get('/:id', postsCtrl.show);

// POST a ... post
router.post('/', isLoggedIn, postsCtrl.create);

//DELETE post
router.delete('/:id', postsCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
