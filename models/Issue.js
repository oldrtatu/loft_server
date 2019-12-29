module.exports = (sequelize, DataTypes) => {

    const Issue = sequelize.define('issue', {
      id : {
        type : DataTypes.INTEGER(11),
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
        unique : true
      },
      equipmentType: {
        type: DataTypes.ENUM('TRUCK','TRAILER'),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('AXLE','GENERAL','RECURRENCE'),
        allowNull: false
      },
      typeDriverSide: {
        type: DataTypes.JSON,
        allowNull: true
      },
      typePassengerSide: {
        type: DataTypes.JSON,
        allowNull: true
      },
      typeGeneral: {
        type: DataTypes.JSON,
        allowNull: true
      },
      reportedOn: {
        type: DataTypes.DATE,
        allowNull: false
      },
      dueOn: {
        type: DataTypes.DATE,
        allowNull: true
      },
      postedOn: {
        type: DataTypes.DATE,
        allowNull: true
      },
      period: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      periodUnit: {
        type: DataTypes.ENUM('DAYS','WEEKS','MONTHS','YEAR'),
        allowNull: true
      },
      odometer: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('OPEN','DEFERRED','ASSIGNED','CANCELLED','INCOMPLETE','COMPLETE'),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reportedBy: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  
    Issue.associate = (models) => {
      Issue.belongsTo(models.class, {as : 'category'})
      Issue.belongsTo(models.subsidiary, {as: "division"})
    };
  
    return Issue;
  };
  