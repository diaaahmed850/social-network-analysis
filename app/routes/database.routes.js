module.exports = (app) => {
    const db = require('../controllers/database.controller');

    
    app.route('/db')
        .get(db.all_database)
}
