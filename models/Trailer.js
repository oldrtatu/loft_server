module.exports = (sequelize, DataTypes) => {
  let Trailer = sequelize.define("trailer", {
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
    trailerType: {
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

  Trailer.associate = model => {
    Trailer.belongsTo(model.class, { as: "category" });
    Trailer.belongsTo(model.subsidiary, { as: "division" });
    Trailer.hasOne(model.trailerRegistration, {
      onDelete: "CASCADE"
    });
  };

  return Trailer;
};
