const sequelize = require('../index')

const bcrypt = require("bcrypt")
const { DataTypes }  = require("sequelize")

const User = sequelize.define('user', {
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
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
        }
    }
  }
)

User.prototype.validPassword = async (password) =>{
    return await bcrypt.compare(password, this.password)
}

module.exports = User