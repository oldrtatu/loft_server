module.exports = (sequelize, DataTypes) => {
    let Departments = sequelize.define('department', {
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
            type : DataTypes.ENUM(['CUSTOMERS', 'CUSTOM BROKER', 'CARRIERS', 'VENDORS']),
            allowNull : false
        },
        status : {
            type : DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull : false
        }

    })

    return Departments
}