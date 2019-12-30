module.exports = (sequelize, DataTypes) => {

    let Vendor = sequelize.define('vendor', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cell: {
            type: DataTypes.STRING,
            allowNull: true
        },
        uscell: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull: false
        },

    })

    Vendor.associate = (model) => {
        Vendor.hasOne(model.address, {
            onDelete: "CASCADE"
        })
    }

    return Vendor;
};
