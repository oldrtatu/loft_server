module.exports = (sequelize, DataTypes) => {
  let Contact = sequelize.define("contact", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.ENUM(["TRACKING AND TRACING", "ACCOUNTS", "DISPATCH"]),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tollfree: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      allowNull: false
    },
    workingHours: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        let data = this.getDataValue("workingHours");
        if(data) {
          return JSON.parse(data);
        }
      },

      set(value) {
        if(value) {
          this.setDataValue("workingHours", JSON.stringify(value));
        }
      }
    }
  });

  Contact.associate = model => {
    Contact.belongsTo(model.customer, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Contact;
};
