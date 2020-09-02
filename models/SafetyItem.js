module.exports = (sequelize, DataTypes) => {
  let SafetyItem = sequelize.define("safetyItem", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    safetyItem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false,
    },
    affiliatedWith: {
      type: DataTypes.ENUM([
        "TRUCK",
        "TRAILER",
        "CHASIS",
        "CONTAINER",
        "DRIVER",
      ]),
      allowNull: false,
    },
  });

  SafetyItem.associate = models =>{
    SafetyItem.hasMany(models.safetyJoin)
  }

  return SafetyItem;
};
