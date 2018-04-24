module.exports = (app) => {
    const posts = require('../controllers/post.controller');

    app.route('/posts')
        .get(posts.list_all_posts)
        .post(posts.create_post);
    app.route('/post/:postId')
        .get(posts.read_post)
        .put(posts.update_post)
        .delete(posts.delete_post);
    app.route('/like')
        .get(posts.increment_like)
}
