module.exports = (sequelize, DataTypes) => {
  const PO = sequelize.define("PO", {
    equipmentType: {
      type: DataTypes.ENUM("NONE", "TRUCK", "TRAILER"),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    assignedTo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    assignedBy: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    poType: {
      type: DataTypes.ENUM("GENERAL", "INVENTORY", "ISSUES"),
      allowNull: false
    },
    vendorNotes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reportingTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "COMPLETE", "INVOICED", "ENTERED IN QB"),
      allowNull: false
    }
  });

  PO.associate = models => {
    PO.belongsTo(models.class, { as: "category" });
    PO.belongsTo(models.vendor);
    PO.belongsTo(models.subsidiary, {
      as: "division"
    });
    PO.belongsTo(models.truck);
  };

  return PO;
};
