module.exports = (sequelize, DataTypes) => {
    let Subsidiary = sequelize.define('subsidiary', {
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
        unitNo : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : true
        },
        cell : {
            type : DataTypes.STRING,
            allowNull : true
        },
        fax : {
            type : DataTypes.STRING,
            allowNull : true
        },
        status : {
            type : DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull : false
        },

    })

    Subsidiary.associate = (model) => {
        Subsidiary.hasOne(model.address, {
            onDelete : "CASCADE"
        })
    }

    return Subsidiary
}