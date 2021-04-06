const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {next(error)}

  if (!token || !decodedToken.id) {
    return response.status(401).json('invalid token or missing')
  }
  const { id: userId } = decodedToken
  request.userId = userId

  next()
}