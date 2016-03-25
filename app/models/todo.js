var mongoose = require('mongoose');

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
    mongoose.model(mongoose.model('Category', categorySchema));
    mongoose.model(mongoose.model('BookMark', bookmarkSchema));
}


