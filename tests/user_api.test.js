const mongoose = require('mongoose')

const { server } = require('../index')
const User = require('../models/user')
const { api, listOfUsers, getAllContentsFromUsers } = require('./userHelpers')

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of listOfUsers) {
    const userObj = new User(user)
    await userObj.save()
  }
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are listOfUsers.length users', async () => {
  const { response } = await getAllContentsFromUsers()

  expect(response.body).toHaveLength(listOfUsers.length)
})

test('there are a UID and is named id', async () => {
  const { response } = await getAllContentsFromUsers()
  const { body: users } = response
  const firstUser = users[0]
  expect(firstUser.id).toBeDefined()
})

test('there are a users about username.content', async () => {
  const { contents, response } = await getAllContentsFromUsers()
  const { body: users } = response
  const firstUser = users[0]
  expect(contents).toContain(firstUser.username)
})

//PUT
test('a user can be edited', async () => {
  const toEditUser = {
    username: 'A new blog edited',
    name: 'José L. Riego',
    passwordHash: 'pass123456',
    blogs: []
  }
  const { contents, response } = await getAllContentsFromUsers()
  const { body: users } = response
  const [blogToEdit] = users
  await api
    .put(`/api/users/${blogToEdit.id}`)
    .send(toEditUser)
    .expect(200)

  const { contents: afteEditContents } = await getAllContentsFromUsers()
  // expect(response.body).toHaveLength(listOfUsers.length)
  expect(afteEditContents).toContain('A new blog edited')
})

// POST
test('a new user can be added', async () => {
  const newUser = {
    username: 'pepito',
    name: 'José L. Riego',
    password: 'pass123456',
    blogs: []
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentsFromUsers()
  expect(response.body).toHaveLength(listOfUsers.length + 1)
  expect(contents).toContain(newUser.username)

  const { body: users } = response
  const lastUser = users[users.length -1]
  expect(lastUser.blogs).toBeDefined()
  expect(lastUser.blogs).toStrictEqual([])
})

test('a new User cannot be added without username and password', async () => {
  const newUser = {
    username: '',
    name: 'José L. Riego',
    password: '',
    blogs: []
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('a user can be deleted', async () => {
  const { response: responseInit } = await getAllContentsFromUsers()
  const { body: users } = responseInit
  const [userToDelete] = users
  await api
    .delete(`/api/users/${userToDelete.id}`)
    .expect(204)

  const { contents, response: responseDeleted } = await getAllContentsFromUsers()
  expect(responseDeleted.body).toHaveLength(listOfUsers.length - 1)
  expect(contents).not.toContain(userToDelete.content)
})

test('a user cannot be deleted if not exist, dhurrrrr!', async () => {
  await api
    .delete(`/api/users/123456`)
    .expect(400)

  const { response: responseDeleted } = await getAllContentsFromUsers()
  expect(responseDeleted.body).toHaveLength(listOfUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})