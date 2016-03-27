var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({
  name    : String,
  personal     : Boolean,
  bookmarks : [{ type: Schema.Types.ObjectId, ref: 'BookMark' }],
  collaborators     : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator : { type: Schema.Types.ObjectId, ref: 'User' }
});

var Category  = mongoose.model('Category', categorySchema);
module.exports = Category;