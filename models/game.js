var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    posts: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
    images: [String],
    console: {
      type: String
    },
    developer: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
