const mongoose = require('mongoose')
// const supertest = require('supertest')

const { server } = require('../index')
const Blog = require('../models/blog')
const { api, listOfBlogs, getAllContentsFromPosts } = require('./helpers')

// const api = supertest(app)

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
  const { response } = await getAllContentsFromPosts()

  expect(response.body).toHaveLength(listOfBlogs.length)
})

test('there are a UID and is named id', async () => {
  const response = await api.get('/api/blogs')
  const { body: blogs } = response
  const firstBlog = blogs[0]
  expect(firstBlog.id).toBeDefined()
})

test('there are a blogs about Go To Statement Considered Harmful', async () => {
  const { contents } = await getAllContentsFromPosts()
  expect(contents).toContain('Go To Statement Considered Harmful')
})

//PUT
test('a blog can be edited', async () => {
  const toEditBlog = {
    title: 'A new blog edited',
    author: 'José L. Riego',
    url: 'http://www.expresate.com.br/coronavirus',
    likes: 0
  }
  const { contents, response } = await getAllContentsFromPosts()
  const { body: blogs } = response
  const [blogToEdit] = blogs
  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(toEditBlog)
    .expect(200)

  const { contents: afteEditContents } = await getAllContentsFromPosts()
  // expect(response.body).toHaveLength(listOfBlogs.length)
  expect(afteEditContents).toContain('A new blog edited')
})

// POST
test('a new blog can be added', async () => {
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

  const { contents, response } = await getAllContentsFromPosts()
  expect(response.body).toHaveLength(listOfBlogs.length + 1)
  expect(contents).toContain(newPost.title)

  const { body: blogs } = response
  const lastBlog = blogs[blogs.length -1]
  expect(lastBlog.likes).toBeDefined()
  expect(lastBlog.likes).toBe(0)
})

test('a new blog cannot be added without title and url', async () => {
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

  // const { response } = await getAllContentsFromPosts()
  // expect(response.body).toHaveLength(listOfBlogs.length)
})

test('a blog can be deleted', async () => {
  const { response: responseInit } = await getAllContentsFromPosts()
  const { body: blogs } = responseInit
  const [blogToDelete] = blogs
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const { contents, response: responseDeleted } = await getAllContentsFromPosts()
  expect(responseDeleted.body).toHaveLength(listOfBlogs.length - 1)
  expect(contents).not.toContain(blogToDelete.content)
})

test('a blog cannot be deleted if not exist, dhurrrrr!', async () => {
  await api
    .delete(`/api/blogs/123456`)
    .expect(400)

  const { response: responseDeleted } = await getAllContentsFromPosts()
  expect(responseDeleted.body).toHaveLength(listOfBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})