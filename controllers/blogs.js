const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response, next) => {
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

blogsRouter.post('/', async (request, response, next) => {
    const newBlog = new Blog(request.body)
  
    try {
      const savedBlog = await newBlog.save()
      response.status(201).json(savedBlog)
    } catch (error) {
      next(error)
    }
  })
  
  blogsRouter.delete('/:id', async (request, response, next) => {
    const { id } = request.params

    try {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter