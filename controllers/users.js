const Post = require("../models/Post");
const User = require("../models/User");
const Game = require("../models/game");

function show(req, res) {
  console.log('req.params.name: ', req.params.name)
  User.findOne({ userName: req.params.name }).populate('posts').populate('gamesPlayed').populate({
    path: 'posts',
    populate: {path: 'gameId'}
  }).exec(function (err, foundUser) {
    if (err) console.log(err);
    res.render('users/show', {
      title: `${foundUser.userName}'s Profile`,
      foundUser,
      user: req.user
    });
  });
}

function index(req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) console.log(err);
    res.redirect(`/users/${user.userName}`);
  });
}



module.exports = {
  index,
  show
};