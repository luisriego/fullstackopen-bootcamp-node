const supertest = require('supertest')

const { app } = require('../index')

const api = supertest(app)

const listOfUsers = [
  {
    _id: '5a422aa71b54a676234d17fa',
    username: 'autor-unknow',
    name: 'Author C. Unknow',
    passwordHash: 'password123',
    blogs: [],
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fb',
    username: 'edsger',
    name: 'Edsger W. Dijkstra',
    passwordHash: 'password123',
    blogs: [],
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fc',
    username: 'fulano',
    name: 'Fulano de tal',
    passwordHash: 'password123',
    blogs: [],
    __v: 0
  }
]

const getAllContentsFromUsers = async () => {
  const response = await api.get('/api/users')
  return {
    contents: response.body.map(user => user.username),
    response
  }
}

  module.exports = {
    api,
    getAllContentsFromUsers,
    listOfUsers
  }