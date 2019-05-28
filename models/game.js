var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    posts: [{
      type: Schema.Types.ObjectId,
      ref: "Post"
    }],
    mainImage: String,
    images: [String],
    console: {
      type: String
    },
    developers: [String],
    guid: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
