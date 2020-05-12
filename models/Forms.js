module.exports = (sequelize, DataTypes) => {
  let Form = sequelize.define("form", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM(["DRAFT", "PUBLISHED", "COMPLETE"]),
      allowNull: false,
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return Form;
};
