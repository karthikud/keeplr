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
  title    : String,
  _creator : { type: Number, ref: 'User' },
});
module.exports = {
    mongoose.model('Category', categorySchema);
    mongoose.model('BookMark', bookmarkSchema);
}


