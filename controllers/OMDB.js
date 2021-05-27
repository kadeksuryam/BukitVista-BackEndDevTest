const axios = require('axios')

const baseURI = 'http://www.omdbapi.com/'

const getPosterURI = async (title) => {
    const URI = baseURI + `?apikey=${process.env.OMDB_API_KEY}&t=${title}`
    
    const resURI = await axios.get(URI)

    return resURI.data
}

module.exports = {
    getPosterURI
}