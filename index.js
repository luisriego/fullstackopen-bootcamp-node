require('dotenv').config()
const http = require('http')
const express = require('express')

require('./mongo')

const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const notFound = require('./middleware/notFound')
const errorsHandle = require('./middleware/errorsHandle')
const { constants } = require('zlib')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(next)
})

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(next)
})

app.use(notFound)

app.use(errorsHandle)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }