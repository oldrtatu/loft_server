module.exports = (sequelize, DataTypes) => {
  let Terminal = sequelize.define("terminal", {
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
    }
  });

  Terminal.associate = model => {
    Terminal.belongsTo(model.location, { as: "location" });
    Terminal.belongsTo(model.service, { as: "service" });
  };

  return Terminal;
};
