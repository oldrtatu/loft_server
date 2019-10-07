module.exports = (sequelize, DataTypes) => {
  let Notes = sequelize.define("notes", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attachmentUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Notes;
};
