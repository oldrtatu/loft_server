module.exports = (sequelize, DataTypes) => {
  let SafetyJoin = sequelize.define("safetyJoin", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    mileage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mileageUnit: {
      type: DataTypes.ENUM(["KM", "MILES"]),
      allowNull: false,
    },
    period: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    periodUnit: {
      type: DataTypes.ENUM(["DAYS", "WEEKS","MONTHS","YEARS"]),
      allowNull: false,
    },
    text:{
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
  });

  SafetyJoin.associate = models => {
    SafetyJoin.belongsTo(models.safetyItem)
    SafetyJoin.belongsTo(models.safetyGroup)
  }

  return SafetyJoin;
};
