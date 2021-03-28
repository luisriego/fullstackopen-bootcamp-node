const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new Schema({
    title:{
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    author: {
        type: String,
        minlength: 3,
        required: true,
        unique: false
    },
    url: {
        type: String,
        minlength: 3,
        required: true,
        unique: false
    },
    likes: {
        type: Number,
        minValue: 0,
        required: true,
        unique: false
    }
  })

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = model('Blog', blogSchema)

module.exports = Blog