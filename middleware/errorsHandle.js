module.exports = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'id is malformed!' })
    }

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json('invalid token or missing')
    }

    if (error.name === 'ValidationError') {
        return res.status(400).send({
            error: error.name,
            problem: error._message,
            message: error.message 
        })
    }

    next(error)
}