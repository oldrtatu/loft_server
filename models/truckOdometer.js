module.exports = (sequelize, DataTypes) => {
  let TruckOdometer = sequelize.define("truckOdometer", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    odometer: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:0
    },
    odometerUnit: {
      type: DataTypes.ENUM(["MILES"]),
      allowNull: false,
      defaultValue:"MILES"
    },
    odometerDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
  });

  return TruckOdometer;
};
