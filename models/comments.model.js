const db = require('../db/connection');
const {checkExists} = require('../db/seeds/utils')

exports.selectCommentsByArticleId = async (article_id) => {
            const results = await db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id]);
            const comments = results.rows;   
            if(comments.length === 0) {
                await checkExists('articles', 'article_id', article_id)
            }
            return comments;

      
        
      
        
        
        
        
       
        
        
    
}