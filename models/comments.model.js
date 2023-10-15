const db = require('../db/connection');
const {checkExists, checkUserExists, validateComment, checkCommentExists} = require('../db/seeds/utils')

exports.selectCommentsByArticleId = async (article_id) => {
            const results = await db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id]);
            const comments = results.rows;   
            if(comments.length === 0) {
                await checkExists('articles', 'article_id', article_id)
            }
            return comments;
}

exports.insertCommentByArticleId = async (comment, article_id) => {
    const {username, body} = comment
    await validateComment(comment)
    await checkUserExists('users', 'username', username)
    
    const results =  await db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`, [username, body, article_id])
    const post = results.rows;
    
    

    
    return post

    
}

exports.deleteCommentByCommentId = async (comment_id) => {
    await checkCommentExists('comments', 'comment_id', comment_id)
    const results = await db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [comment_id]);
    
    return results.rows
}