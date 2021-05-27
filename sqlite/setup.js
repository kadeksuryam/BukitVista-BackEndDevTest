const sequelize = require('../sequelize')

const reset = async () => {
    console.log("Rewrite the SQLite")

    await sequelize.sync({force: true})

    await sequelize.models.user.create({name: 'kadek', password: 'tes'})

    await sequelize.models.user.create({name: 'surya', password: 'tes2'})

    await sequelize.models.user.create({name: 'mahardika', password: 'tes3'})

    await sequelize.models.favorite_movies.bulkCreate([
        { title: 'the imitation game', user_id: 1 },
        { title: 'the man who knew infinity', user_id: 1 },
        { title: 'snowden', user_id: 1 },
        { title: 'theory of everything', user_id: 2},
        { title: '21', user_id: 2}
    ])

    console.log("Done!")
}

module.exports = reset