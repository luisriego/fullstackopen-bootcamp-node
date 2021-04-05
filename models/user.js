const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username:{
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: false
    },
    passwordHash: {
        type: String,
        minlength: 6,
        required: true,
        unique: false
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
  })

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('User', userSchema)

module.exports = User
