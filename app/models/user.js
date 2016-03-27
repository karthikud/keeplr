var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = Schema({
  name    : String,
  personal     : Boolean,
  boards : [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;