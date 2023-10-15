const express = require('express')
const app = express()
const {fetchTopics} = require('./controllers/topics.controller')
const { fetchAPI } = require('./controllers/api.controller')
const { fetchArticlesById, fetchAllArticles, patchArticle } = require('./controllers/articles.controller')
const { fetchCommentsByArticleId, postCommentByArticleId, deleteComment } = require('./controllers/comments.controller')
const { fetchAllUsers } = require('./controllers/users.controller')




app.get('/api/topics', fetchTopics)
app.get('/api', fetchAPI)
app.get('/api/articles/:article_id', fetchArticlesById)
app.get('/api/articles', fetchAllArticles)
app.get('/api/articles/:article_id/comments', fetchCommentsByArticleId)
app.get('/api/users', fetchAllUsers)

app.use(express.json())

app.post('/api/articles/:article_id/comments', postCommentByArticleId)
app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)













app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "path not found"})
  })


app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === '22P02') {
    res.status(400).send({msg:'400: ID not exists' })
  }else if (err.code === '23503') {
    res.status(400).send({msg:'Bad Request' })
  } else {
    
    res.status(500).send({ msg: 'internal server error'})

  }
  
}) 
module.exports = app;