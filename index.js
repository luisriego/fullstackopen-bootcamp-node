require('dotenv').config()
const express = require('express')

require('./mongo')

const app = express()
// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
// morgan.token('body', function (req) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

let persons = []

app.get('/', (res) => {
    res.send('<p>Please create content</p>')
})

app.get('/api/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} persons</p><p>${new Date().toISOString()}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons)
        })

})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (!person) {
        return res.status(404).end()
    }
    return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const personReq = req.body
    if (!personReq || !personReq.name) {
        return res.status(400).json({
            error: 'No name found in this person!'
        })
    }

    if (!personReq || !personReq.number) {
        return res.status(400).json({
            error: 'No number found in this person!'
        })
    }

    if (persons.find(person => person.name === personReq.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    const newPerson = new Person({
        name: personReq.name,
        number: personReq.number
    })

    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
})


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)