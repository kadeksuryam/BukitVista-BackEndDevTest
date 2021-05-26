const { DataTypes }  = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('favorite_movies', {
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
}
