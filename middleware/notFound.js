module.exports = (req, res) => {
    return res.status(400).json({
        error: 'path incorrect'
    })
}