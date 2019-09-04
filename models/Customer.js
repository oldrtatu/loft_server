module.exports = (sequelize, DataTypes) => {
  let Customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false
    }
  });

  Customer.associate = model => {
    Customer.hasOne(model.address, {
      onDelete: "CASCADE"
    });

    Customer.hasMany(model.contact, {
      onDelete: "CASCADE"
    });

    Customer.hasOne(model.billTo, {
      onDelete: "CASCADE"
    });

    Customer.hasOne(model.notification, {
      onDelete: "CASCADE"
    });

    Customer.hasOne(model.notes, {
      onDelete: "CASCADE"
    });
  };

  return Customer;
};
