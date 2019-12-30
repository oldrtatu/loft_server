module.exports = (sequelize, DataTypes) => {

    const PO = sequelize.define('PO', {
      equipmentType:  {
        type: DataTypes.ENUM('NONE','TRUCK','TRAILER'),
        allowNull : true
      },
      assignedBy: {
        type:  DataTypes.INTEGER,
        allowNull: false
      },
      createdBy: {
        type:  DataTypes.STRING(50),
        allowNull: false
      },
      assignedTo: {
        type:  DataTypes.STRING(50),
        allowNull: false
      },
      assignedBy: {
        type:  DataTypes.STRING(50),
        allowNull: false
      },
      type: {
        type:  DataTypes.STRING(10),
        allowNull: true
      },
      POtype: {
        type:  DataTypes.ENUM('GENERAL','INVENTORY','ISSUES'),
        allowNull: false
      },
      poNotes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      vendorNotes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reportingTime: {
        type:  DataTypes.TIME,
        allowNull: false
      },
      status: {
        type:  DataTypes.ENUM('ACTIVE','COMPLETE','INVOICED','ENTERED IN QB'),
        allowNull: false
      },
      unitNo: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      files: {
        type: DataTypes.JSON,
        allowNull: true
      },
      linkInventory: {
        type: DataTypes.JSON,
        allowNull: true
      }
    });
  
    PO.associate = (models) => {
      PO.belongsTo(models.class, {as : "category"});
      PO.belongsTo(models.Vendor);
      PO.belongsTo(models.Subsidiary,{
        default: 0
      });
    }
  
    return PO;
  };
  