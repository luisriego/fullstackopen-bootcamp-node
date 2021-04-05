const supertest = require('supertest')

const {app, server} = require('../index')

const api = supertest(app)

const listOfBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: null,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'Go To Statement Considered Harmful 2',
    author: 'Author C. Unknow',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    user: null,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Go To Statement Considered Harmful 3',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    user: null,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f6',
    title: 'Go To Statement Considered Harmful 4',
    author: 'Fulano de tal',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    user: null,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Go To Statement Considered Harmful 5',
    author: 'Fulano de tal',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: null,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f4',
    title: 'Go To Statement Considered Harmful 6',
    author: 'Fulano de tal',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    user: null,
    __v: 0
  }
]

const getAllContentsFromPosts = async () => {
  const response = await api.get('/api/blogs')
  return {
    contents: response.body.map(blog => blog.title),
    response
  }
}

  module.exports = {
    api,
    getAllContentsFromPosts,
    listOfBlogs
  }