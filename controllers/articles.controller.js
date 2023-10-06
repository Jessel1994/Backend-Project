const { selectArticleById, selectAllArticles, updateArticleWithVotes } = require("../models/articles.model");

exports.fetchArticlesById = (req, res, next) => {
    const {article_id} = req.params;
    selectArticleById(article_id).then((article) => {
        
        res.status(200).send({articles: article})

    })
    .catch(err => {
        
        next(err)
    })

}

exports.fetchAllArticles = (req, res, next) => {
    selectAllArticles().then((articles) => {
        res.status(200).send({articles: articles})
    })
}

exports.patchArticle = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body;
    
    updateArticleWithVotes(article_id, inc_votes)
    .then((article) => {
        
        res.status(200).send({articles: article[0]})
    })
    .catch(err => {
        
        next(err)
    })
}