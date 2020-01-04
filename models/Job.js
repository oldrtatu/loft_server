module.exports = (sequelize, DataTypes) => {
  let Job = sequelize.define("job", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    jobType: {
      type: DataTypes.ENUM(["ADD", "UPDATE", "DELETE"]),
      allowNull: false
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    recurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    period: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    periodUnit: {
      type: DataTypes.ENUM("DAYS", "WEEKS", "MONTHS", "YEAR"),
      allowNull: true
    }
  });
  return Job;
};
