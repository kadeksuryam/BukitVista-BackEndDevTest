const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const db_reset = require('./sqlite/setup')
const sequelize = require('./sequelize')
const jwt = require('jsonwebtoken')

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


const getTokenFrom = request => {
    const authorization  = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

app.get('/api', (req, res) => {
    res.send('hello world')
})

app.get('/api/movies', (req, res) => {
    res.status(403).send({ error: 'forbidden' })
})

app.get('/api/movies/favorite', (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id){
        return res.status(401).json({error : 'token missing or invalid'})
    }
    return res.status(200).json({status : 'success'})
})

app.post('/api/login', (req, res) => {
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
                const userForToken = {
                    name : user.name,
                    id : user.user_id
                }
                
                //asumsikan expires dalam 1 jam
                const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

                res.status(200).send({token, name: user.name})
            }
        }
    )
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app