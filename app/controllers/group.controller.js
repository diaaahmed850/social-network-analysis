var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    User = mongoose.model('User'),
    Group = mongoose.model('Group');


exports.list_all_groups = (req, res)=>{
    user = JSON.parse(localStorage.getItem('user'));  
    Group.find({'users':user._id}).exec(async (err, my_groups)=>{
        if (err){
            res.send(err);
        }
        await Group.find({'users':{$ne:user._id}}).exec(async (err, groups)=>{
            if (err){
                res.send(err);
            }
            console.log(groups)
            await res.render('group/all_groups',{'groups':groups,'my_groups':my_groups})        

        });
        
    });
};

exports.create_new_group = (req, res)=>{
    user = JSON.parse(localStorage.getItem('user'));  
    req.body['users'] = [user._id]
    Group.create(req.body, (err, groups)=>{
        if (err){
            res.send(err);
        }
        res.writeHead(302, {
            'Location': '/all_groups'
        });
        res.end();    });
};

exports.read_group = (req, res)=>{
    Group.findById(req.params.groupId).populate('users').exec((err, group)=>{
        if (err)
            res.send(err);
        res.render('group/view_group',{'group':group});
    });
};

exports.join_group = (req, res)=>{
    user = JSON.parse(localStorage.getItem('user'));      
    Group.findByIdAndUpdate(req.query._id,{$addToSet:{'users':user._id}}).exec(async (err, group)=>{
        if (err)
            res.send(err);
        await Group.findById(req.query._id).populate('users').exec((err, group)=>{
                if (err)
                    res.send(err);
                console.log(group)
                res.render('group/view_group',{'group':group});
        });            
});};

exports.create_group_posts =  (req, res)=>{
    var new_post = new Post(req.body);
    new_post.save(async (err, post)=>{
        if (err)
            res.send(err)
        var post_id = post._id
        var user_id = JSON.parse(localStorage.getItem('user'))._id
        console.log(post)
        console.log('//////////////////')
        //update posts array to add new post for this user
        // User.findById({_id:user_id}).populate('posts').exec(async (err, user)=>{
    await User.findByIdAndUpdate({_id:user_id}, {$addToSet:{'posts':post_id}}, {new:true}).populate('posts').exec( async (err, user)=>{
            
            if (err)
                res.send(err)

            localStorage.setItem('user',JSON.stringify(user));

           await Group.findById(req.body.groups).populate('users').exec(async (err, group)=>{
            if (err)
                res.send(err);
                await console.log(user)
                console.log('////////////////////')
            res.render('group/view_group',{'group':group});
            });

        });
        
    });
};