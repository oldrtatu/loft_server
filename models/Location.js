module.exports = (sequelize, DataTypes) => {
  let Location = sequelize.define("location", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false,
    },
    workingHours: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  Location.associate = (model) => {
    Location.hasOne(model.address, {
      onDelete: "CASCADE",
    });
  };

  return Location;
};
