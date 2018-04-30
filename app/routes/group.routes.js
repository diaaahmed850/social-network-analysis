module.exports = (app) => {
    const groups = require('../controllers/group.controller');

    
    app.route('/all_groups')
        .get(groups.list_all_groups)
        .post(groups.create_new_group)
    app.route('/all_groups/:groupId')
        .get(groups.read_group)
    app.route('/join_group')
        .get(groups.join_group)
    app.route('/create_group_posts')
        .post(groups.create_group_posts)
}
