const { selectArticleById, selectAllArticles } = require("../models/articles.model");

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