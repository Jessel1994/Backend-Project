

const db = require('../db/connection');


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