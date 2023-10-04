const { selectCommentsByArticleId } = require("../models/comments.model")

exports.fetchCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
        
    return selectCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({comments: comments})

    })
    .catch(err => {
        next(err);
    })
}