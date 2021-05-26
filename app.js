const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const sequelize = require('./sequelize/index')
///const { routes } = require('./routes')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/movies', (req, res) => {
    res.status(403).send({ error: 'forbidden' })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app