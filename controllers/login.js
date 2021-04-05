const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
    const { body } = request
    const { username, password } = body
    const user = await User.findOne({username})

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        response.status(401).json({
            error: 'invalid user or password'
        })
    }

    const tokenData = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET)

    response.send({
        username: user.username,
        name: user.name,
        token
    })
})

module.exports = loginRouter