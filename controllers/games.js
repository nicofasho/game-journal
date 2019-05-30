const Game = require('../models/game');

function show(req, res) {
  Game.findById(req.params.id).populate('posts').populate({
    path: 'posts',
    populate: { path: 'authorId' }
  }).exec(function (err, game) {
    if (err) console.log(err);
    res.render('games/show', {
      title: game.title,
      game,
      user: req.user
    });
  });
}



module.exports = {
  show
};