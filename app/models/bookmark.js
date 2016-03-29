var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookmarkSchema = Schema({
  belongs : { type: Schema.Types.ObjectId, ref: 'Category' },
  url    : String,
  _creator : { type: Schema.Types.ObjectId, ref: 'User' }
});

var BookMark = mongoose.model('BookMark', bookmarkSchema);
module.exports = BookMark;
