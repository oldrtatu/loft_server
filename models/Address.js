module.exports = (sequelize, DataTypes) => {
    let Address = sequelize.define('address', {
        id : {
            type : DataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement: true,
            unique : true,
            allowNull : false
        },
        country : {
            type : DataTypes.ENUM(["CANADA", "USA"]),
            allowNull : false
        },
        addressLine1 : {
            type : DataTypes.STRING,
            allowNull : true
        },
        addressLine2 : {
            type : DataTypes.STRING,
            allowNull : true
        },
        city : {
            type : DataTypes.STRING,
            allowNull : true
        },
        state : {
            type : DataTypes.STRING,
            allowNull : true
        },
        province : {
            type : DataTypes.STRING,
            allowNull : true
        },
        postalCode : {
            type : DataTypes.STRING,
            allowNull : true
        },
        zipCode : {
            type : DataTypes.STRING,
            allowNull : true
        }
    })


    return Address
}