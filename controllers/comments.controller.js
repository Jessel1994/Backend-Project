const { selectCommentsByArticleId, insertCommentByArticleId } = require("../models/comments.model")

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
    if(!comment.hasOwnProperty('username') && !comment.hasOwnProperty('body')) {
        return res.status(400).send({msg: 'Body is Malformed'})
        

    } 
    if (typeof comment.username !== "string" || typeof comment.body !== "string") {
        return res.status(400).send({msg: 'Schema Validation Failed'})
    }
    
    insertCommentByArticleId(comment, article_id).then((comment) => {
        
        res.status(201).send({comments: comment[0]})

    }).catch(err => {
        next(err)
    })
    
}