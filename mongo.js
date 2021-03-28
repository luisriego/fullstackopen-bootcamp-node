const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

// Mongodb connection
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.error(err)
    })