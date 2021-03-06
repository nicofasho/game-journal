var express = require("express");
var router = express.Router();
var postsCtrl = require("../controllers/posts");

// GET /posts
router.get("/", postsCtrl.index);

router.get("/new", isLoggedIn, postsCtrl.new);

// gameTitle Search AJAX route
router.get("/titleSearch", postsCtrl.search);

router.get("/gameInfo/:id", postsCtrl.gameInfo);
// show a post
router.get("/:id", isLoggedIn, postsCtrl.show);

router.get('/:id/edit', isLoggedIn, postsCtrl.edit);

router.put('/:id', isLoggedIn, postsCtrl.update);

// POST a ... post
router.post("/", postsCtrl.create);


//DELETE post
router.delete("/:id", postsCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
