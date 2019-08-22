module.exports = (sequelize, DataTypes) => {
  let Customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    customerCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    customerName: {
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

    Customer.hasOne(model.billto, {
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
