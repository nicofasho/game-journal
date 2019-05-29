const Post = require("../models/Post");

function newComment(req, res) {
    res.render("posts/comments/new", {
        title: "Create a Comment",
        user: req.user,
        postId: req.params.postId
    });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === "") delete req.body[key];
    }
    Post.findById(req.params.postId, function (err, post) {
        post.comments.push(req.body);
        post.save(function (err) {
            if (err) console.log(err);
            res.redirect(`/posts/${post._id}`);
        });
    });
}

function deleteComment(req, res) {
    Post.findById(req.params.postId, function (err, post) {
        post.comments.id(req.params.commentId).remove();
        post.save(function (err) {
            if (err) console.log(err);
            console.log('comment removed');
            res.redirect(`/posts/${req.params.postId}`);
        });
    });
}


function edit(req, res) {
    res.render('posts/comments/edit', {
        title: 'Edit Your Comment',
        user: req.user
    });
}

function update(req, res) {
    Post.findById(req.params.postId, function (err, post) {
        post.comments.findByIdAndUpdate(req.params.commentId, req.body, function (err, comment) {
            res.redirect(`/posts/${postId}`);
        })
    });
}

module.exports = {
    new: newComment,
    create,
    delete: deleteComment,
    edit,
    update
};