const sequelize = require('../sequelize')

const reset = async () => {
    console.log("Rewrite the SQLite")

    await sequelize.sync({force: true})

    await sequelize.models.user.create({name: 'surya', password: 'tes'})

    await sequelize.models.favorite_movies.bulkCreate([
        { name: 'the imitation game', user_id: 1 }
    ])

    console.log("Done!")
}

module.exports = reset