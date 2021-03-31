const { mostLikes } = require('../utils/blog')

describe('most likes', () => {
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
          author: 'Author C. Unknow',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 3,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'Go To Statement Considered Harmful 3',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 150,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f6',
          title: 'Go To Statement Considered Harmful 4',
          author: 'Fulano de tal',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 15,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f5',
          title: 'Go To Statement Considered Harmful 5',
          author: 'Fulano de tal',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f4',
          title: 'Go To Statement Considered Harmful 6',
          author: 'Fulano de tal',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 1,
          __v: 0
        }
    ]
  
    test('when list has blogs, get blog with most likes', () => {
      const result = mostLikes(listOfBlogs)
      console.log(result)
      expect(result).toStrictEqual({author: "Edsger W. Dijkstra", likes: 155})
    })

    test('when list is an empty array, must return undefined', () => {
      const result = mostLikes([])
      expect(result).toBe(undefined)
    })

    test('when list is not an array, must return undefined', () => {
      const result = mostLikes()
      expect(result).toBe(undefined)
    })
  })