const express = require('express')
const app = express()

app.use(express.json)

let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id) 
    person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    if (!person || !person.name) {
        return res.status(400).json({
            error: `No name found in this person, found: ${person}`
        })
    }

    const ids = persons.map(person => person.id)
    const maxId = Math.max(... ids)

    const newPerson = {
        id: maxId + 1,
        name: person.name,
        number: person.number
    }

    persons = [... persons, newPerson]

    res.json(newPerson)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)