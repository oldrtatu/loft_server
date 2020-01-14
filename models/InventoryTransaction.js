module.exports = (sequelize, DataTypes) => {
  let InventoryTransaction = sequelize.define("inventoryTransaction", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    operation: {
      type: DataTypes.ENUM(["ADDITION", "REDUCTION"]),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM([
        "CREATED",
        "ADDED",
        "LINKED",
        "ADJUSTED",
        "REMOVED"
      ]),
      allowNull: false
    },
    noOfItem: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  });

  InventoryTransaction.associate = model => {
    InventoryTransaction.belongsTo(model.inventory, { as: "inventory" });
    InventoryTransaction.belongsTo(model.PO, { as: "PO" });
    InventoryTransaction.belongsTo(model.user);
  };

  return InventoryTransaction;
};
