module.exports = (sequelize, DataTypes) => {
    let Driver = sequelize.define('driver', {
        id : {
            type : DataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement: true,
            unique : true,
            allowNull : false
        },
        code : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : true
        },
        cell : {
            type : DataTypes.STRING,
            allowNull : true
        },
        uscell : {
            type : DataTypes.STRING,
            allowNull : true
        },
        email : {
            type : DataTypes.STRING,
            allowNull : true
        },
        status : {
            type : DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull : false
        },

    })

    Driver.associate = (model) => {
        Driver.hasOne(model.address, {
            onDelete : "CASCADE"
        })
    }

    return Driver
}