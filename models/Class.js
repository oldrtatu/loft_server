module.exports = (sequelize, DataTypes) => {
    let Class = sequelize.define('class', {
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
        associationWith : {
            type : DataTypes.ENUM(['ORDER', 'ORDER LEG', 'CARRIERS', 'VENDORS']),
            allowNull : false
        },
        status : {
            type : DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull : false
        },
        colorCode : {
            type : DataTypes.ENUM(["#123123", "#098890"]),
            allowNull : false,
        }

    })

    return Class
}