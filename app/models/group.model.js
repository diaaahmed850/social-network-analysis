var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GroupSchema = new Schema({
    name:{
        type:String,
        required: 'kindly enter you name',
    },
    describtion:{
        type:String,
    },
    users:[{type:Schema.Types.ObjectId, ref:'User'}]

});

module.exports = mongoose.model('Group', GroupSchema)
