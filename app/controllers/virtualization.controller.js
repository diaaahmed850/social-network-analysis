exports.visualize_users = (req, res)=>{
  User.find({}).populate('friends').exec((err, user)=>{
      if (err)
          res.send(err);
          console.log(JSON.parse(localStorage.getItem('user')).name);

      res.render('visualization/users',{'users':user,'user_id':JSON.parse(localStorage.getItem('user')).name});
  });


};
