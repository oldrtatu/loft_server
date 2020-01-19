module.exports = (sequelize, DataTypes) => {
  const PO = sequelize.define("PO", {
    equipmentType: {
      type: DataTypes.ENUM("NONE", "TRUCK", "TRAILER"),
      allowNull: true
    },
    assignedTo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    assignedBy: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    poType: {
      type: DataTypes.ENUM("GENERAL", "INVENTORY", "ISSUES"),
      allowNull: false
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
    PO.belongsTo(models.user, { as: "createdBy" });
    PO.hasMany(models.issue);
  };

  return PO;
};
