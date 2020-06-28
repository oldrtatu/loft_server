module.exports = (sequelize, DataTypes) => {
  let Customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE", "ON CREDIT HOLD"]),
      allowNull: false,
    },
  });

  Customer.associate = (model) => {
    // 1:1 with address
    Customer.hasOne(model.address, {
      onDelete: "CASCADE",
    });

    // 1:n with contacts
    Customer.hasMany(model.contact, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });

    // 1:n with billTo
    Customer.hasMany(model.billTo, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });

    // 1:1 with notification
    Customer.hasOne(model.notification, {
      onDelete: "CASCADE",
    });

    // 1:n with notes
    Customer.hasMany(model.notes, {
      onDelete: "CASCADE",
    });
  };

  return Customer;
};
