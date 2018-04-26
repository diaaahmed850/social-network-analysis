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

exports.login = async (req, res) => {
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
        var home_users = [user]
            User.find({'_id':{$in:user.friends}}).populate('posts').exec(async(err, users)=>{
                if(err)
                    res.send(err)
                // console.log(users)
          
                home_users.push.apply(home_users,users);
                    // console.log(home_posts)
             await res.render('home',{'users':home_users});
            
            });
            

        
    }); 
   
};

exports.get_home = (req, res)=>{
    user = JSON.parse(localStorage.getItem('user'));
    var home_users = [user]
    User.find({'_id':{$in:user.friends}}).populate('posts').exec(async(err, users)=>{
        if(err)
            res.send(err)
        // console.log(users)
  
        home_users.push.apply(home_users,users);
            // console.log(home_posts)
     await res.render('home',{'users':home_users});
    
    });
        // console.log(user.friends[0].posts)
};


exports.read_user = (req, res)=>{

    User.findById(req.params.userId).populate('friends').populate('posts').exec((err, user)=>{
        if (err)
            res.send(err);
        res.render('user/user_profile',{'user':user});
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

exports.list_all_users = (req, res)=>{
    User.find({}, (err, users)=>{
        if (err)
            res.send(err)
        res.render('user/all_users',{'users':users})
    });
};

exports.add_friend = (req, res)=>{
    user_id = JSON.parse(localStorage.getItem('user'))._id
    User.findByIdAndUpdate({_id:user_id}, {$addToSet:{'friends':req.query._id}} ,(err, user)=>{
        if (err)
            res.send(err);
            console.log(user)
        User.findByIdAndUpdate({_id:req.query._id}, {$addToSet:{'friends':user_id}} ,(err, user)=>{
            if (err)
                res.send(err);
            console.log(user)
        
            res.render('user/all_users',{'users':user.friends})
        });
    });

};

exports.list_my_friends = (req, res)=>{
    user_id = JSON.parse(localStorage.getItem('user'))._id
    User.findOne({_id:user_id}).populate('friends').exec((err, user)=>{
        if (err)
            res.send(err);
        console.log(user)
        res.render('user/my_friends',{'users':user.friends})
    });

};