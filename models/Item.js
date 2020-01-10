module.exports = (sequelize, DataTypes) => {
  let Item = sequelize.define("item", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    partNo: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    equipmentType: {
      type: DataTypes.ENUM(["TRUCK", "TRAILER"]),
      unique: false,
      allowNull: true
    },
    initialQuantity: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    reorderAt: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true
    },
    quantityUnit: {
      type: DataTypes.ENUM([
        "LBS",
        "KG",
        "L",
        "GAL",
        "PR",
        "PCS",
        "DZN",
        "TOT",
        "BKT",
        "CAS",
        "PKG",
        "SKD",
        "UNT",
        "BAGS"
      ]),
      unique: false,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false
    }
  });

  Item.associate = model => {
    Item.belongsTo(model.class, { as: "category" });
  };

  return Item;
};
