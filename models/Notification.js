module.exports = (sequelize, DataTypes) => {
  let Notification = sequelize.define("notification", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true
    }
  });

  Notification.associate = model => {
    Notification.belongsTo(model.contact, { as: "delayInPickup" });
    Notification.belongsTo(model.contact, { as: "delayInDelivery" });
    Notification.belongsTo(model.contact, { as: "orderEntered" });
    Notification.belongsTo(model.contact, { as: "liveTrackingEmail" });
    Notification.belongsTo(model.contact, { as: "shipmentPickedUp" });
    Notification.belongsTo(model.contact, { as: "shipmentDelivered" });
    Notification.belongsTo(model.contact, { as: "emailForAccessorialCharges" });
    Notification.belongsTo(model.contact, { as: "invoice" });
    Notification.belongsTo(model.contact, { as: "invoiceDueNotification" });
    Notification.belongsTo(model.contact, { as: "equipmentAvailability" });
  };

  return Notification;
};
