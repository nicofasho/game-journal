var express = require("express");
var router = express.Router();
var commentsCtrl = require("../controllers/comments");

router.get('/:postId/comments/new', isLoggedIn, commentsCtrl.new);

router.post('/:postId/comments', commentsCtrl.create);

router.delete('/:postId/comments/:commentId', isLoggedIn, commentsCtrl.delete);

router.get('/:postId/comments/:commentId/edit', isLoggedIn, commentsCtrl.edit);

router.put('/:postId/comments/:commentId', isLoggedIn, commentsCtrl.update);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}


module.exports = router;