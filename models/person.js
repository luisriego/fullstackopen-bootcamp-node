const { model, Schema } = require('mongoose')

const personSchema = new Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = model('Person', personSchema)

// const person = new Person({
//     name: 'Luis Riego',
//     number: '12-34567890'
// })

// Person.find({})
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })

// person.save()
//     .then((resp) => {
//         console.log(resp)
        
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.error(err)
//     })

module.exports = Person