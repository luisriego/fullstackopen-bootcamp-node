const { totalLikes } = require('../utils/blog')

describe('total likes', () => {
    const listASingleBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const listOfBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      }
    ]
  
    test('when list has blogs, add all likes', () => {
      const result = totalLikes(listOfBlogs)
      expect(result).toBe(8)
    })

    test('when list has only one blog, add all likes', () => {
      const result = totalLikes(listASingleBlog)
      expect(result).toBe(5)
    })

    test('when list is an empty array, must return 0', () => {
      const result = totalLikes([])
      expect(result).toBe(0)
    })

    test('when list is not an array, must return 0', () => {
      const result = totalLikes()
      expect(result).toBe(0)
    })
  })