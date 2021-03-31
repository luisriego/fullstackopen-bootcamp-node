const totalLikes = (blogs) => {
    let totalizador = 0
    if (blogs) {
        blogs.map((blog) =>
          totalizador = blog.likes + totalizador 
        )
    }
      
    return totalizador
}

module.exports = {
    totalLikes
}