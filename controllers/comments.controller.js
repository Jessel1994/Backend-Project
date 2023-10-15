const { selectCommentsByArticleId, insertCommentByArticleId, deleteCommentByCommentId } = require("../models/comments.model")

exports.fetchCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
        
    return selectCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send({comments: comments})

    })
    .catch(err => {
        next(err);
    })
}

exports.postCommentByArticleId = (req, res, next) => {
    const comment = req.body
    
    const {article_id} = req.params
    
    
    insertCommentByArticleId(comment, article_id).then((comment) => {
        
        res.status(201).send({comments: comment[0]})

    }).catch(err => {
        
        next(err)
    })
    
}

exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params
    deleteCommentByCommentId(comment_id).then(() => {
        res.status(204).send({msg: {}})
    }).catch(err => {
        next(err)
    })
}