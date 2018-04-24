var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post');

exports.list_all_users = (req, res)=>{
    console.log(res.body)
    User.find({}, (err, user)=>{
        if (err)
           res .send(err);
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

exports.login = (req, res) => {
    User.findOne(req.body).populate('posts').exec((err, user)=>{
        if (err)
            res.send(err);
        if (user==''){
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        }
        localStorage.setItem('user',JSON.stringify(user));
        // user = JSON.parse(localStorage.getItem('user'))
        // posts = user.posts
    
        // var posts_content = []        
        // posts.forEach(post_id => {
        //     Post.findById({_id:post_id},(err, post)=>{
        //         posts_content.push(post.content);
        //     });
        // });
        // console.log('///////////////')
        // setTimeout(()=>{
        // },1000); //to get values of database after certain time
        // console.log(user.posts)
        res.render('home',{'posts':user.posts});
    }); 
};

exports.get_home = (req, res)=>{
    user = JSON.parse(localStorage.getItem('user'));
    User.findOne(user).populate('posts').exec((err, user)=>{
        if (err)
            res.send(err)
        console.log(user)
        res.render('home',{'posts':user.posts});
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