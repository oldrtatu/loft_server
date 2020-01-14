module.exports = (sequelize, DataTypes) => {
  let Inventory = sequelize.define("inventory", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false
    },
    initialQuantity: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: false
    },
    reorderAt: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: true
    },
    currentQuantity: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: false
    },
    checkDate: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false
    },
    notes: {
      type: DataTypes.JSON,
      unique: false,
      allowNull: true
    },
    costPerItem: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: false
    },
    costUnit: {
      type: DataTypes.ENUM(["CAD", "USD"]),
      allowNull: false
    },
    coreItem: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  Inventory.associate = model => {
    Inventory.belongsTo(model.item, { as: "item" });
    Inventory.belongsTo(model.vendor, { as: "vendor" });
  };

  return Inventory;
};
