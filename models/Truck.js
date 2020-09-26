module.exports = (sequelize, DataTypes) => {
  let Truck = sequelize.define("truck", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    unitNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    truckType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false
    },
    notes: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });

  Truck.associate = model => {
    Truck.belongsTo(model.class, { as: "category" });
    Truck.belongsTo(model.subsidiary, { as: "division" });
    Truck.hasOne(model.truckRegistration, {
      onDelete: "CASCADE"
    });
    Truck.hasOne(model.truckOdometer, {
      onDelete: "CASCADE"
    });
    Truck.hasMany(model.truckSafety)
  };

  return Truck;
};
