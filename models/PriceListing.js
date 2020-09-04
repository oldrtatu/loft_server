module.exports = (sequelize, DataTypes) => {
  let PriceListing = sequelize.define("priceListing", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    itemTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quotationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    priceUnit: {
      type: DataTypes.ENUM(["CAD", "USD"]),
      allowNull: false,
    },
    warrantyAvailable: {
      type: DataTypes.ENUM(["YES", "NO"]),
      allowNull: false,
    },
    warrantyProvider: {
      type: DataTypes.ENUM(["VENDOR", "MANUFACTURER"]),
      allowNull: true,
    },
    period: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    periodUnit: {
      type: DataTypes.ENUM(["DAYS", "WEEKS", "MONTHS", "YEARS"]),
      allowNull: true,
    },
    mileage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    mileageUnit: {
      type: DataTypes.ENUM(["KM", "MILES"]),
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
  });

  PriceListing.associate = (models) => {
    PriceListing.belongsTo(models.item);
    PriceListing.belongsTo(models.vendor);
  };

  return PriceListing;
};
