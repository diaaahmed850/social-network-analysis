var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    User = mongoose.model('User'),
    Group = mongoose.model('Group');

exports.all_database = (req, res)=>{
    User.find({}, (err, users)=>{
        Post.find({}, (err, posts)=>{
            Group.find({}, (err, groups)=>{
                res.json({'users':users,'posts':posts,'groups':groups})
            });
        });
    });
};

