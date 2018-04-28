var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name:{
        type:String,
        required: 'kindly enter you name',
    },
    email:{
        type:String,
        require: 'kindly enter  your mail',
        unique: true
    },
    password:{
        type:String,
        required: 'please enter your password'
    },
    friends:[{type:Schema.Types.ObjectId, ref:'User'}]
    ,
    posts:[{type:Schema.Types.ObjectId, ref: 'Post'}],
    pic:{
        type:String,
        default:"https://image.flaticon.com/icons/svg/236/236831.svg"
    },
    birthDate:{
        type: Date, default:Date.now
    },
    gender:{
        type:Boolean, default:1
    }
    });

module.exports = mongoose.model('User', UserSchema)