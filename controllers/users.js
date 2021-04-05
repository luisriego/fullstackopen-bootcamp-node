const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1
    })
    response.json(users)
})

usersRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const requestUser = request.body
  
  const editUser = {
      username: requestUser.username,
      name: requestUser.name,
      passwordHash: requestUser.passwordHash,
      blogs: requestUser.blogs
  }
  
  try {
      const editedUser = await User.findByIdAndUpdate(id, editUser, { new: true })
      response.status(200).json(editedUser)
      } catch (error) {
          next(error)
      }
  })

usersRouter.post('/', async (request, response, next) => {
  const { body } = request
  const { username, name, password } = body
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    await User.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter