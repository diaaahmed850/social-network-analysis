var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
    content:{
        type:String,
        required: 'kindly enter you content',
    },
    likes:[{type:Schema.Types.ObjectId, ref:'User'}],
    created:{
        type: Date, default:  Date.now() + 7*24*60*60*1000
    },
    groups:[{type:Schema.Types.ObjectId, ref:'Group'}],

});

module.exports = mongoose.model('Post', PostSchema)
