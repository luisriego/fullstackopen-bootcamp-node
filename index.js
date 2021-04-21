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
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

// Blog methods
app.use('/api/blogs', blogsRouter)

// User methods
app.use('/api/users', usersRouter)

// Login method
app.use('/api/login', loginRouter)

// Testing method
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)

app.use(errorsHandle)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }