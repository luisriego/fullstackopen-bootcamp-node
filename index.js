const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        'name': 'Arto Hellas',
        'number': '040-123456',
        'id': 1
    },
    {
        'name': 'Ada Lovelace',
        'number': '39-44-5323523',
        'id': 2
    },
    {
        'name': 'Dan Abramov',
        'number': '12-43-234345',
        'id': 3
    },
    {
        'name': 'Mary Poppendieck',
        'number': '39-23-6423122',
        'id': 4
    }
]

app.get('/api/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} persons</p><p>${new Date().toISOString()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

    const ids = persons.map(person => person.id)
    const maxId = Math.max(... ids)

    const newPerson = {
        id: maxId + 1,
        name: personReq.name,
        number: personReq.number
    }

    persons = [... persons, newPerson]

    res.status(200).json(newPerson)
})


const PORT = process.env.port || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)