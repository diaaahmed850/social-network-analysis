var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post');

exports.list_all_users = (req, res)=>{
    console.log('list_all_users...')
    
    user = JSON.parse(localStorage.getItem('user'));
    if (user == null){
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }

    User.find({}, (err, users)=>{
        if (err)
           res .send(err);
        res.render('user/all_users',{'users':users});
    });
};

exports.create_user = (req, res) => {
    console.log('create_user...')
    var new_user = new User(req.body);
    new_user.save((err, user)=>{

        if (err)
            res.json(err)
        else{
            localStorage.setItem('user',JSON.stringify(user));
            var home_users = [user]
                User.find({'_id':{$in:user.friends}}).populate('posts').exec(async(err, users)=>{
                    if(err)
                        res.send(err)
              
                    home_users.push.apply(home_users,users);
                 await res.render('home',{'users':home_users});
                
                });
            }
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
          
                home_users.push.apply(home_users,users);
             await res.render('home',{'users':home_users});
            
            });
            

        
    }); 
   
};

exports.get_home = async (req, res)=>{
    console.log('get_home')
    
    user = JSON.parse(localStorage.getItem('user'));    
    await User.findOne({'_id':user._id}).populate('posts').exec(async (err, user)=>{
        if (err)
            res.send(err)
        await localStorage.setItem('user',JSON.stringify(user));        
    });
    user = JSON.parse(localStorage.getItem('user'));

    if (user == null){
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
    var home_users = [user]
    User.find({'_id':{$in:user.friends}}).populate('posts').exec(async(err, users)=>{
        if(err)
            res.send(err)
  
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
    user = JSON.parse(localStorage.getItem('user'));
    if (user == null){
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
    User.find({}, (err, users)=>{
        if (err)
            res.send(err)
        res.render('user/all_users',{'users':users})
    });
};

exports.add_friend = (req, res)=>{
    console.log('add_frined')

    user_id = JSON.parse(localStorage.getItem('user'))._id
    User.findByIdAndUpdate({_id:user_id}, {$addToSet:{'friends':req.query._id}} ,(err, user)=>{
        if (err)
            res.send(err);
        User.findByIdAndUpdate({_id:req.query._id}, {$addToSet:{'friends':user_id}} ,(err, user)=>{
            if (err)
                res.send(err);
        
            res.render('user/all_users',{'users':user.friends})
        });
    });

};

exports.list_my_friends = (req, res)=>{
    console.log('lise_my_friends....')

    user = JSON.parse(localStorage.getItem('user'));
    if (user == null){
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
    user_id = JSON.parse(localStorage.getItem('user'))._id
    User.findOne({_id:user_id}).populate('friends').exec((err, user)=>{
        if (err)
            res.send(err);
        res.render('user/my_friends',{'users':user.friends})
    });

};
exports.logout = (req, res)=>{
    localStorage.removeItem('user');
    res.writeHead(302, {
        'Location': '/'
    });
    res.end();
};

exports.search_user = (req, res)=>{
    var name_search,email_search;
    param = req.query.search;
    my_user = JSON.parse(localStorage.getItem('user'));
    
    if (param.indexOf("@")!=-1){
        User.find({email:{ "$regex":param}}, (err, users)=>{
            if (err)
                res.send(err);
        res.render('user/all_users',{'users':users});
            
        });
    }
    else{
        User.find({ name: { "$regex":param, '$options' : 'i'}}, (err, users)=>{
            if (err)
                res.send(err);
        res.render('user/all_users',{'users':users});
            
        });
    }

};


