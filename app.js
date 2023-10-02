const express = require('express')
const app = express()
const {fetchTopics} = require('./controllers/topics.controller')


app.use(express.json())

app.get('/api/topics', fetchTopics)















app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "path not found"})
  })


app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'internal server error'})
}) 
module.exports = app;