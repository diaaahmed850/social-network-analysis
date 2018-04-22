var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Post = mongoose.model('Post');

exports.list_all_users = (req, res)=>{
    console.log(res.body)
    User.find({}, (err, user)=>{
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_user = (req, res) => {
    console.log(req.body)
    var new_user = new User(req.body);
    new_user.save((err, user)=>{

        if (err)
            res.send(err)
        res.json(user);
    });
};

exports.profile_user = (req, res) => {
    console.log(req.body)
    User.find(req.body, (err, user)=>{
        if (err)
            res.send(err);
        if (user==''){
            res.writeHead(302, {
                'Location': '/'
              });
              res.end();
        }
        else
        res.render('post/posts',{'context':[{"message":"logged in"},{'user':user}]});
    }); 
};

exports.read_user = (req, res)=>{

    User.findById(req.params.userId, (err, user)=>{
        Post.findById(user.posts[0], (err, post)=>{
            if (err)
                res.send(err);
            res.json(post);
        });
        // if (err)
        //     res.send(err);
        // res.json(user);
    });
};

exports.update_user = (req, res)=>{
    User.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, user)=>{
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_user = (req, res)=>{
    User.remove({_id: req.params.userId}, (err, user)=>{
        if (err)
            res.send(err);
        res.json({message: 'User successfully deleted'});
    });
};