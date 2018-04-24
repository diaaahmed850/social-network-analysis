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
    password:{
        type:String,
        required: 'please enter your password'
    },
    friends:[{type:Schema.Types.ObjectId, ref:'User'}]
    ,
    posts:[{type:Schema.Types.ObjectId, ref: 'Post'}]
    });

module.exports = mongoose.model('User', UserSchema)