const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  let Task = sequelize.define("task", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    audioFiles: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    documentFile: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    imageFile: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(["INCOMPLETE", "COMPLETE"])
    }
  });

  Task.associate = model => {
    Task.belongsTo(model.PO);
    Task.belongsTo(model.todo);
    Task.belongsTo(model.issue);
  };

  return Task;
};
