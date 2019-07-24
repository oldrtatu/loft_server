module.exports = (sequelize, DataTypes) => {
    let TruckRegistration = sequelize.define('truckRegistration', {
        id : {
            type : DataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement: true,
            unique : true,
            allowNull : false
        },

        vinNo : {
            type : DataTypes.STRING,
            unique : true,
            allowNull  : false
        },
        make : {
            type : DataTypes.STRING,
            allowNull : true
        },
         model : {
            type : DataTypes.STRING,
            allowNull : true
         },
         year : {
             type : DataTypes.STRING,
             allowNull : true
         },
        plateNo : {
            type : DataTypes.STRING,
            allowNull : true
        },
        rinNo : {
            type : DataTypes.STRING,
            allowNull : true
        },
        ifta : {
            type : DataTypes.STRING,
            allowNull : true
        },
        vehicleWeight : {
            type : DataTypes.STRING,
            allowNull : true
        },
        vehicleWeightUnit : {
            type : DataTypes.ENUM(["KG", "POUND"]),
            allowNull : false
        },
        regGrossWeight : {
            type : DataTypes.STRING,
            allowNull : true
        },
        regGrossWeightUnit : {
            type : DataTypes.ENUM(["KG", "POUND"]),
            allowNull : false
        }

    })

    return TruckRegistration
}