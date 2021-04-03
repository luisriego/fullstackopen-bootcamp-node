require('dotenv').config()
const http = require('http')
const express = require('express')

require('./mongo')

const app = express()
const cors = require('cors')
const notFound = require('./middleware/notFound')
const errorsHandle = require('./middleware/errorsHandle')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

// Blog methods
app.use('/api/blogs', blogsRouter)

// User methods
app.use('/api/users', usersRouter)

app.use(notFound)

app.use(errorsHandle)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }