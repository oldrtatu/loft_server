module.exports = (sequelize, DataTypes) => {
  let Notes = sequelize.define("notes", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  });

  return Notes;
};
