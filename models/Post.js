var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  postTime: {
    type: Date,
    default: function() {
      var d = new Date();
      return d;
    },
    gameTitle: {
      type: String,
      required: true
    },
    body: {
      type: String
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
