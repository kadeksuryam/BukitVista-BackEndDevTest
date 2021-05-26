const bcrypt = require("bcrypt")
const { DataTypes }  = require("sequelize");

module.exports = (sequelize) => {
    const User =
        sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks:{
            beforeSave : async (user) => {
                user.password = await bcrypt.hash(user.password, 8)
            }
        }
    }
    )
    User.prototype.validPassword = async (given_password, db_password) => {
        return await bcrypt.compare(given_password, db_password)
    }
}





