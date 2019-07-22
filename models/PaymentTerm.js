module.exports = (sequelize, DataTypes) => {
    let pt = sequelize.define('paymentTerm', {
        id : {
            type : DataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement: true,
            unique : true,
            allowNull : false
        },
        termCode : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        description : {
            type : DataTypes.STRING,
            allowNull : true
        },
        dueAfter : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        dueUnit : {
            type : DataTypes.ENUM(['DAYS', 'WEEKS', 'FORTNIGHT', 'MONTHS']),
            allowNull : false
        },
        status : {
            type : DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull : false
        }

    })

    return pt
}