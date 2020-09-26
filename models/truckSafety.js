module.exports = (sequelize, DataTypes) => {
  let TruckSafety = sequelize.define("truckSafety", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
  });

  TruckSafety.associate = models => {
    TruckSafety.belongsTo(models.truck)
    TruckSafety.belongsTo(models.safetyGroup)
  }

  return TruckSafety;
};
