var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      default: "I forgot to type a comment :/"
    }
  },
  { timestamps: true }
);

var postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    postTime: {
      type: Date,
      default: function () {
        var d = new Date();
        return d;
      }
    },
    gameTitle: {
      type: String,
      required: true
    },
    body: {
      type: String,
      default: "A post will go here eventually...."
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true
    },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", postSchema);
