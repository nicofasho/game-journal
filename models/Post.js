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
      type: String,
      default: 'A post will go here eventually....'
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
