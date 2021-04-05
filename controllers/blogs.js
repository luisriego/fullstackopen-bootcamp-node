const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response, next) => {
const { id } = request.params
const requestBlog = request.body

    const editBlog = {
        title: requestBlog.title,
        author: requestBlog.author,
        url: requestBlog.url,
        likes: requestBlog.likes,
        user: requestBlog.user
    }

try {
    const editedBlog = await Blog.findByIdAndUpdate(id, editBlog, { new: true })
    response.status(200).json(editedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
  const { 
    title,
    author,
    url,
    userId 
  } = request.body

  const user = await User.findById(userId)

  const newBlog = new Blog({
    title,
    author,
    url,
    user: user._id 
  })

  try {
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// blogsRouter.post('/', async (request, response, next) => {
//   const newBlog = new Blog(request.body)

//   try {
//     const savedBlog = await newBlog.save()
//     response.status(201).json(savedBlog)
//   } catch (error) {
//     next(error)
//   }
// })

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