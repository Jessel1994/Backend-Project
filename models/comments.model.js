const db = require('../db/connection');

exports.selectCommentsByArticleId = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id])
    .then((results) => {
        const comments = results.rows;
        if (comments.length === 0) {
            return Promise.reject({
                status: 404, 
                msg: 'Article doesn\'t exist'
            })
        }
        return comments
    })
}