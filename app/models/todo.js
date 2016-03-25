var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({
  _id     : Number,
  name    : String,
  personal     : Number,
  bookmarks : [{ type: Schema.Types.ObjectId, ref: 'Bookmark' }],
  collaborators     : [{ type: Number, ref: 'User' }]
});

var bookmarkSchema = Schema({
  _belongs : { type: Number, ref: 'Category' },
  url    : String,
  _creator : { type: Number, ref: 'User' }
});

var Category  = mongoose.model('Category', categorySchema);
var BookMark = mongoose.model('BookMark', bookmarkSchema);
module.exports = BookMark;
