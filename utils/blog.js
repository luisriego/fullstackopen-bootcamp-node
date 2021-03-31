var _ = require('lodash');
var { countBy, entries, flow, head, last, maxBy, partialRight } = _;

const totalLikes = (blogs) => {
    let totalizador = 0
    if (blogs) {
        blogs.map((blog) =>
          totalizador = blog.likes + totalizador 
        )
    }
      
    return totalizador
}

const mostBlogs = (blogs) => {
    if (!blogs) {
        return undefined
    }
    if (blogs.length === 0) {
        return undefined
    }

    authorsCounterObject = _.countBy(blogs, 'author');
    authorsCounterArray = _.toPairs(authorsCounterObject);
    maxValue = _.max(authorsCounterArray)
    mostBlogger = {"author": maxValue[0], "blogs": maxValue[1]}

    return mostBlogger
}

const mostLikes = (blogs) => {
    if (!blogs) {
        return undefined
    }
    if (blogs.length === 0) {
        return undefined
    }

    var output =
        _(blogs)
            .groupBy('author')
            .map((objs, key) => ({
                'author': key,
                'likes': _.sumBy(objs, 'likes') }))
            .value();
    output = _.maxBy(output, function(o) { return o.likes; });

    return output
}

module.exports = {
    totalLikes,
    mostBlogs,
    mostLikes
}