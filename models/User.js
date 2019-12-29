const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        uid : {
            type : DataTypes.STRING,
            unique: true,
            allowNull : false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            hooks: {
                beforeCreate: (user, options) => {
                    return bcrypt.hash(user.password, stage.saltingRounds).then(res => {
                        user.password = res
                    }).catch(err => {
                        throw new Error(err)
                    })
                },

                beforeUpdate: (user, options) => {
                    return bcrypt.hash(user.password, stage.saltingRounds).then(res => {
                        user.password = res
                    }).catch(err => {
                        throw new Error(err)
                    })
                },
            }
        }
    )

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }

    return User
}