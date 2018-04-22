var mongoose = require('mongoose'),
    post = mongoose.model('Post');
    
exports.list_all_posts = (req, res)=>{
    console.log(res.body)
    Post.find({}, (err, post)=>{
        if (err)
            res.send(err);
        res.render('post/posts',{'post':post});
    });
};

exports.create_post = (req, res) => {
    console.log(req.body)
    var new_post = new Post({"content":"this is post content"});
    new_post.save((err, post)=>{
        if (err)
            res.send(err)
        // console.log(post._id)
        res.json(post);
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