module.exports = (sequelize, DataTypes) => {
  let SafetyGroup = sequelize.define("safetyGroup", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SafetyGroup.associate = models =>{
    SafetyGroup.hasMany(models.safetyJoin)
  }

  return SafetyGroup;
};
