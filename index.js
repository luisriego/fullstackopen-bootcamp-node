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

app.get('/api/blogs', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.put('/api/blogs/:id', async (request, response, next) => {
  const { id } = request.params
  const requestBlog = request.body

    const editBlog = {
        title: requestBlog.title,
        author: requestBlog.author,
        url: requestBlog.url,
        likes: requestBlog.likes
    }

  try {
    const editedBlog = await Blog.findByIdAndUpdate(id, editBlog, { new: true })
    response.status(200).json(editedBlog)
  } catch (error) {
    next(error)
  }
})

app.post('/api/blogs', async (request, response, next) => {
  const newBlog = new Blog(request.body)

  try {
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/blogs/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use(notFound)

app.use(errorsHandle)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }