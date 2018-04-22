var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name:{
        type:String,
        required: 'kindly enter you name',
    },
    email:{
        type:String,
        require: 'kindly enter  your mail'
    },
    friends:{
        type:[Schema.Types.ObjectId]
    },
    posts:{
        type:[Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Users', UserSchema)