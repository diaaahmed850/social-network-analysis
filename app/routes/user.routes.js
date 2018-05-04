module.exports = (app) => {
    const users = require('../controllers/user.controller');
    var bodyParser = require('body-parser');
    const virtualize = require('../controllers/virtualization.controller');
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_user);
    app.route('/user/:userId')
        .get(users.read_user)
        .put(users.update_user)
        .delete(users.delete_user);
    app.route('/home')
        .post(users.login)
        .get(users.get_home)
    app.route('/all_users')
        .get(users.list_all_users)
    app.route('/add_friend')
        .get(users.add_friend)
    // app.route('/my_friends')
    //     .get(users.list_my_friends)
    app.route('/logout')
        .get(users.logout)
    app.route('/search_user')
        .get(users.search_user)
    app.route('/visualize_users')
        .get(virtualize.visualize_users)
    app.route('/my_profile')
        .get(users.my_profile)
    app.route('/visualize_users_diaa')
        .get(virtualize.visualize_users_diaa)
    app.route('/visualize_users_diaa/:userName')
        .get(virtualize.redraw)
    app.route('/stat')
        .get(virtualize.stat)
}
