const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const db_reset = require('./sqlite/setup')
const sequelize = require('./sequelize')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

// Re-Initialize the DB, for ease of use
db_reset()


app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/movies', (req, res) => {
    res.status(403).send({ error: 'forbidden' })
})

app.post('/login', (req, res) => {
    const { name, password } = req.body
    sequelize.models.user.findOne({where: {name: name}}).then(
        async (user) => {
            if(!user){
                res.status(404).send({error: 'not found'})
            }
            else if(!await user.validPassword(password, user.password)){
                res.status(401).send({error: 'unauthorized'})
            }
            else{
                //buat JWT TOKEN
                res.status(200).send({status: 'login success'})
            }
        }
    )
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app