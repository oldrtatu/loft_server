module.exports = (sequelize, DataTypes) => {
  let BillTo = sequelize.define("billTo", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    term: {
      type: DataTypes.ENUM(["1 % on 20"]),
      allowNull: true,
    },
    standardToPrintNotes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    standardInvoiceInstructions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quickPayDiscountType1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quickPayDiscountType1Unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    quickPayDiscountType2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quickPayDiscountType2Unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    quickPayDiscountType3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quickPayDiscountType3Unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false,
    },
  });

  BillTo.associate = (model) => {
    BillTo.belongsTo(model.location, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return BillTo;
};
