const sequelize = require("../index")
const { DataTypes }  = require("sequelize")

const Favorite_Movies = sequelize.define('favorite_movies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    title: {
        type: DataTypes.STRING 
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = {
    Favorite_Movies
}