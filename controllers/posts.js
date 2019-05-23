const Post = require('../models/Post');

module.exports = {
  index,
  create,
  delete: deletePost,
  show,
  new: newPost
};

function index(req, res, next) {
  Post.find({}).exec(function(err, posts) {
    res.render('posts/index', {
      title: 'Recent Posts',
      posts,
      user: req.user
    });
  });
}

function create(req, res, next) {
  
}

function show(req, res, next) {
  
}

function deletePost(req, res, next) {
  
}

function newPost(req, res, next) {
  res.render('posts/new',{
    title: 'Create a Post',
    user: req.user
  })
}
