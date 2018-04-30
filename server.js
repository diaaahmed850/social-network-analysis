
var express = require('express'),
    app = express(),
    port = 3000,
    mongoose = require('mongoose'),
    User = require('./app/models/user.model'),
    Post = require('./app/models/post.model'),
    bodyParser = require('body-parser');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localStorage');
    }

// general variables


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://m49dy:admin12345@ds251799.mlab.com:51799/sna_project')

// configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use('/assets', express.static('assets'));
app.use('/static', express.static('assets'));

// initialize routes
var routes_user = require('./app/routes/user.routes')
var routes_post = require('./app/routes/post.routes')
routes_user(app); 
routes_post(app);
// initialize default route 

app.get('/',(req, res)=>{
    res.render('signup_login');
}); 

// server listening
app.listen(port);
console.log('sna server started on port: '+port);