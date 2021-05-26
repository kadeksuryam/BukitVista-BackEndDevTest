const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sqlite/database.sqlite'
})

const modelDefiners = [
	require('./models/user.model'),
    require('./models/favorite_movies.model')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

module.exports = sequelize 