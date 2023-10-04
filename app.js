const express = require('express')
const app = express()
const {fetchTopics} = require('./controllers/topics.controller')
const { fetchAPI } = require('./controllers/api.controller')
const { fetchArticlesById, fetchAllArticles } = require('./controllers/articles.controller')




app.get('/api/topics', fetchTopics)
app.get('/api', fetchAPI)
app.get('/api/articles/:article_id', fetchArticlesById)
app.get('/api/articles', fetchAllArticles)














app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "path not found"})
  })


app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === '22P02') {
    res.status(400).send({msg:'ID not exists' })
  } else {
    
    res.status(500).send({ msg: 'internal server error'})

  }
  
}) 
module.exports = app;