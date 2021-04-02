const mongoose = require('mongoose')
const supertest = require('supertest')

const {app, server} = require('../index')
const Blog = require('../models/blog')
const { listOfBlogs } = require('./helpers')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of listOfBlogs) {
    const blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are listOfBlogs.length blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listOfBlogs.length)
})

test('there are a blogs about Go To Statement Considered Harmful', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.title)
  expect(contents).toContain('Go To Statement Considered Harmful')
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})