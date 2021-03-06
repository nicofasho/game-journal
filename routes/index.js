var passport = require('passport');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


//Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile']}
));

//Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  { failureRedirect : '/posts',
    successRedirect : '/posts' }
    )
  );

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
