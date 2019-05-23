var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: function() {
      var d = new Date();
      return d;
    }
  },
  postCount: {
    type: Number,
    default: 0
  },
  gamesPlayed: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  googleId: String,
  avatar: String
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
