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

test('there are a UID and is named id', async () => {
  const response = await api.get('/api/blogs')
  const { body: blogs } = response
  const firstBlog = blogs[0]
  expect(firstBlog.id).toBeDefined()
})

test('there are a blogs about Go To Statement Considered Harmful', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.title)
  expect(contents).toContain('Go To Statement Considered Harmful')
})

test('a new post can be added', async () => {
  const newPost = {
    title: 'A new note added',
    author: 'José L. Riego',
    url: 'http://www.expresate.com.br',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listOfBlogs.length + 1)
  const contents = response.body.map(blog => blog.title)
  expect(contents).toContain('A new note added')
  const { body: blogs } = response
  const lastBlog = blogs[blogs.length -1]
  expect(lastBlog.likes).toBeDefined()
  expect(lastBlog.likes).toBe(0)
})

test('a new post cannot be added without title and url', async () => {
  const newPost = {
    title: '',
    author: 'José L. Riego',
    url: '',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listOfBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})