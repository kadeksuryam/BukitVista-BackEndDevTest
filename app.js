const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
///const { routes } = require('./routes')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app