const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  let Todo = sequelize.define("todo", {
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
    }
  });

  Todo.associate = model => {
    Todo.belongsTo(model.user);
    Todo.hasMany(model.task);
  };

  return Todo;
};
