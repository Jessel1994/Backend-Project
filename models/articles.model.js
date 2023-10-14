

const db = require('../db/connection');
const { validateVotes, checkExists } = require('../db/seeds/utils');


exports.selectArticleById = (article_id) => {
    return db
      .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
      .then((result) => {
        const article = result.rows[0];
        if (!article) {
            return Promise.reject({
                status: 404, 
                msg: 'Article doesn\'t exist'
            })
        }
       
        return article;
    })
   
      
      
  };


  exports.selectAllArticles = () => {
    return db.query(`SELECT articles.article_id, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;`)
    .then((result) => {
            return db.query(`SELECT * FROM articles ORDER BY created_at DESC;`).then((responses) => {
                responses.rows.forEach((article) => {
                    delete article.body
                    result.rows.forEach((commentCounta) => {
                        if (article.article_id === commentCounta.article_id) {
                            article.comment_count = commentCounta.comment_count
                        }
                    })
                })
                return responses.rows
               

        

        
    })
  })
}

exports.updateArticleWithVotes = async (article_id, inc_votes) => {
    
    await checkExists('articles', 'article_id', article_id)
    if (inc_votes === undefined) {
        return Promise.reject({
          status: 400, 
          msg: "Body is Malformed"
        })
    
    }
    
    if (typeof inc_votes !== "number") {
        return Promise.reject({
          status: 400, 
          msg: 'Schema Validation Failed'
        })
    
      }
    // await validateVotes(inc_votes)
    const results = await db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
    const article = results.rows
    
    return article
}