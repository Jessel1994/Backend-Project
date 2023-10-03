const express = require('express')
const app = express()
const {fetchTopics} = require('./controllers/topics.controller')
<<<<<<< HEAD
=======
const { fetchAPI } = require('./controllers/api.controller')
>>>>>>> 3-get-api


app.use(express.json())

app.get('/api/topics', fetchTopics)
<<<<<<< HEAD
=======
app.get('/api', fetchAPI)
>>>>>>> 3-get-api















app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "path not found"})
  })


app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'internal server error'})
}) 
module.exports = app;