const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const { body } = request
    const { username, name, password } = body
    const newUser = new User({
        username,
        name,
        passwordHash: password
    })
  
    try {
      const savedUser = await newUser.save()
      response.status(201).json(savedUser)
    } catch (error) {
      next(error)
    }
})

module.exports = usersRouter