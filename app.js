const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const db_reset = require('./sqlite/setup')
const sequelize = require('./sequelize')
const jwt = require('jsonwebtoken')
const { getPosterURI } = require('./controllers/OMDB')

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

const verifyUser = request => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id){
        return false
    }
    return decodedToken
}

app.get('/api', (req, res) => {
    res.send('hello world')
})

app.get('/api/movies', (req, res) => {
    res.status(403).send({ error: 'forbidden' })
})

app.get('/api/movies/favorite', async (req, res) => {
    const authUser = verifyUser(req)
    if(!authUser){
        return res.status(401).json({error : 'token missing or invalid'})
    }

    //get all user favorite movies
    userMovies = await sequelize.models.favorite_movies.findAll({where: {user_id : authUser.id}, raw: true})

    const posters = []

    for (const movie of userMovies){
        const resAPI = await getPosterURI(movie.title.split(' ').join('+'))
        posters.push({title : resAPI.Title, posterURL: resAPI.Poster})
    }

    return res.status(200).json(posters)
})

//asumsikan title sudah diubah spasinya ke +
app.get('/api/movies/:title', async (req, res) => {
    const authUser = verifyUser(req)
    if(!authUser){
        return res.status(401).json({error : 'token missing or invalid'})
    }

    const title = req.params.title
    
    //fetch data from OMDB's API
    const resAPI = await getPosterURI(title)
    
    if(!resAPI.Poster){
        return res.status(404).json({error: resAPI.Error})
    }
    else{
        return res.status(200).json({title : resAPI.Title, posterURL: resAPI.Poster})
    }
})


app.post('/api/login', async (req, res) => {
    const { name, password } = req.body
    const user = await sequelize.models.user.findOne({where: {name: name}})

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
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app