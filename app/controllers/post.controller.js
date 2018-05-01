var mongoose = require('mongoose'),
    Post = mongoose.model('Post');
    User = mongoose.model('User');
const users = require('../controllers/user.controller');

exports.list_all_posts = (req, res)=>{
    console.log('list_all_posts...')
    user = JSON.parse(localStorage.getItem('user'));
    if (user == null){
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
    Post.find({}, (err, post)=>{
        if (err)
            res.send(err);
        res.render('post/posts',{'posts':post});
    });
};

exports.create_post = (req, res) => {
    var new_post = new Post(req.body);
    new_post.save( (err, post)=>{
        if (err)
            res.send(err)
        var post_id = post._id
        var user_id = JSON.parse(localStorage.getItem('user'))._id
        //update posts array to add new post for this user
        // User.findById({_id:user_id}).populate('posts').exec(async (err, user)=>{
    User.findByIdAndUpdate({_id:user_id}, {$push:{'posts':post_id}}).exec( async (err, user)=>{
            
            if (err)
                res.send(err)

            localStorage.setItem('user',JSON.stringify(user));
                    
           await res.writeHead(302, {
                'Location': '/home'
            });
            res.end();
        });
        
    });
};

exports.read_post = (req, res)=>{
    Post.findById(req.params.postId, (err, post)=>{
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.update_post = (req, res)=>{
    Post.findByIdAndUpdate({_id: req.params.postId}, req.body, {new: true}, (err, post)=>{
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.delete_post = (req, res)=>{
    Post.remove({_id: req.params.postId}, (err, post)=>{
        if (err)
            res.send(err);
        res.json({message: 'post successfully deleted'});
    });
};

exports.increment_like = (req, res)=>{
    console.log('increment like..............')
    user = JSON.parse(localStorage.getItem('user'));
    Post.findByIdAndUpdate({_id: req.query._id},{$addToSet:{'likes':user._id}},{new:true},(err, post)=>{
        if (err)
            res.send(err);
        else{   res.writeHead(302, {
             'Location': '/home'
             });
            res.end();
        }
    });
};

