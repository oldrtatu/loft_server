module.exports = (sequelize, DataTypes) => {
    let Service = sequelize.define('service', {
        id : {
            type : DataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement: true,
            unique : true,
            allowNull : false
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        textField : {
            type : DataTypes.ENUM(['REQUIRED', 'NOT REQUIRED']),
            allowNull : false,
        },
        associationWith : {
            type : DataTypes.ENUM(['CUSTOMER', 'LOCATION', 'CARRIERS', 'VENDORS']),
            allowNull : false
        },
        status : {
            type : DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull : false
        }

    })

    return Service
}