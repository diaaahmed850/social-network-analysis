var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
    content:{
        type:String,
        required: 'kindly enter you content',
    },
    likes:[{type:Schema.Types.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('Post', PostSchema)
