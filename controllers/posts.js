const Post = require("../models/Post");
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
  Post.find({}).exec(function(err, posts) {
    res.render("posts/index", {
      title: "Recent Posts",
      posts,
      user: req.user
    });
  });
}

function create(req, res, next) {}

function show(req, res, next) {}

function deletePost(req, res, next) {}

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

  var url = `https://www.giantbomb.com/api/game/${guid}/?api_key=1caccf71c9a065ba4b6ffc5d97d73ec83dc5dfc1&format=json&field_list=name,developers,images,deck`;

  request(
    {
      url: url,
      headers: {
        "User-Agent": "Christian's Node App"
      }
    },
    function(err, response, body) {
      body = JSON.parse(body);
      gameInfo = body.results;
      Game.create({
        title: gameInfo.name,
        mainImage: gameInfo.image,
        description: gameInfo.deck,
        developer: gameInfo.developers[0].name
      });
    }
  );
}

function search(req, res, next) {
  var value = req.query.search;

  var url = `https://www.giantbomb.com/api/games/?api_key=1caccf71c9a065ba4b6ffc5d97d73ec83dc5dfc1&field_list=name,guid,original_release_date&format=json&limit=10&filter=name:${value}`;

  var titles = [];
  var list = "";

  request(
    {
      url: url,
      headers: {
        "User-Agent": "Christian's Node App"
      }
    },
    function(err, response, body) {
      body = JSON.parse(body);
      if (!body.results) {
        titles = "No results found.";
      } else {
        titles = body.results;
        titles.forEach(function(title) {
          list += `<li><a href="/posts/gameInfo/${title.guid}">${
            title.name
          }</a></li>`;
        });
      }
      res.send(list);
    }
  );
}
