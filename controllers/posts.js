const Post = require("../models/Post");
const User = require('../models/User');
const Game = require("../models/game");
const request = require("request");

module.exports = {
  index,
  create,
  delete: deletePost,
  show,
  new: newPost,
  search,
  gameInfo
};

function index(req, res, next) {
  console.log(req.session.passport);
  Post.find({}).exec(function (err, posts) {
    res.render("posts/index", {
      title: "Recent Posts",
      posts,
      user: req.user
    });
  });
}

function create(req, res, next) {
  console.log('req.body: ', req.body);
  for(let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  req.body.authorId = req.session.passport.user;
  Game.findOne({description: req.body.description}, function(err, game) {
    console.log('game: ', game);
    Post.create({
      title: req.body.title,
      gameTitle: game.title,
      authorId: req.session.passport.user,
      gameId: game._id
    }, function(err, post) {
      if (err) return err;
      console.log(post);
      User.findById(req.session.passport.user, function(err, user) {
        if(user.gamesPlayed.includes(game._id)) {
          user.posts.push(post._id);
          user.save(function(err) {
            if (err) return err;
          });
        } else {
        user.gamesPlayed.push(game._id);
        user.posts.push(post._id);
        console.log('pushed game into user gamesPlayed array');
        user.save(function(err) {
          if (err) return err;
        });
        }
      });
      game.posts.push(post);
      game.save(function(err) {
        if (err) return err;
      });
      res.redirect('/posts');
    });
  });
 }

function show(req, res, next) { }

function deletePost(req, res, next) { }

function newPost(req, res, next) {
  res.render("posts/new", {
    title: "Create a Post",
    user: req.user,
    token: "1caccf71c9a065ba4b6ffc5d97d73ec83dc5dfc1"
  });
}

function gameInfo(req, res, next) {
  var guid = req.params.id;

  var gameInfo = {};

  var url = `https://www.giantbomb.com/api/game/${guid}/?api_key=1caccf71c9a065ba4b6ffc5d97d73ec83dc5dfc1&format=json&field_list=name,developers,image,deck`;

  Game.findOne({ guid: guid }, function (err, doc) {
    if (!err && doc) {
      res.status(200).json(doc);
    } else {
      request(
        {
          url: url,
          headers: { "User-Agent": "Christian's Node App" }
        },
        function (err, response, body) {
          body = JSON.parse(body);
          gameInfo = body.results;

          var devList = [];
          gameInfo.developers.forEach(dev => devList.push(dev.name));
          Game.create({
            title: gameInfo.name,
            mainImage: gameInfo.image.original_url,
            description: gameInfo.deck,
            developers: devList,
            guid: guid
          }, function (err, doc) {
            if (err) return err;
            res.status(200).json(doc);
          });
        });
    }
  });


}

function search(req, res, next) {
  var value = req.query.search;

  var url = `https://www.giantbomb.com/api/games/?api_key=1caccf71c9a065ba4b6ffc5d97d73ec83dc5dfc1&field_list=name,guid&format=json&limit=10&filter=name:${value}`;

  var titles = [];
  var list = "";


  request(
    {
      url: url,
      headers: {
        "User-Agent": "Christian's Node App"
      }
    },
    function (err, response, body) {
      body = JSON.parse(body);
      if (!body.results) {
        titles = "No results found.";
      } else {
        titles = body.results;
        titles.forEach(function (title) {
          list += `<li><a href="#" data-gameId="${title.guid}">${
            title.name
            }</a></li>`;
        });
      }
      res.send(list);
    });
}


// /posts/gameInfo/${title.guid}