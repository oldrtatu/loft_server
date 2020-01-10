module.exports = (sequelize, DataTypes) => {
  let Inventory = sequelize.define("inventory", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false
    },
    currentQuantity: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    checkDate: {
      type: DataTypes.Date,
      unique: false,
      allowNull: false
    }
  });

  Inventory.associate = model => {
    Inventory.belongsTo(model.class, { as: "category" });
  };

  return Inventory;
};
