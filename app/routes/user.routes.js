module.exports = (app) => {
    const users = require('../controllers/user.controller');
    var bodyParser = require('body-parser');
    
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_user);
    app.route('/user/:userId')
        .get(users.read_user)
        .put(users.update_user)
        .delete(users.delete_user);
    app.route('/profile')
        .post(users.profile_user)
}
