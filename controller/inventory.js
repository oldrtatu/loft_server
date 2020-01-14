const model = require("../models");
const STATUS = require("../utils/resTransformer");

module.exports = {
  get: async function(req, res) {
    let inventory = await model.inventory
      .findAll({
        include: [
          {
            model: model.item,
            as: "item"
          },
          {
            model: model.vendor,
            as: "vendor",
            attributes: ["id", "name"]
          }
        ]
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err); // send DB_ERROR
      });

    STATUS.OK(res, inventory); // send data with 200
  },
  add: async function(req, res) {
    const transaction = await model.sequelize.transaction();
    let inventory;
    /** transactions */
    try {
      inventory = await model.inventory.create(
        {
          ...req.body,
          initialQuantity: req.body.currentQuantity,
          coreItem: req.body.currentQuantity
        },
        { transaction }
      );

      let inventoryTransaction = await model.inventoryTransaction.create(
        {
          operation: "ADDITION",
          inventoryId: inventory.id,
          noOfItem: inventory.initialQuantity,
          type: "CREATED"
        },
        { transaction }
      );

      // commit transaction
      await transaction.commit();
    } catch (err) {
      // rollback
      STATUS.DB_ERROR(res, err); // send DB_ERROR
      await transaction.rollback();
    }

    if (inventory) {
      STATUS.ADDED(res, inventory); // send created data with 201 status
    }
  },

  update: async function(req, res) {
    let inventory = await model.inventory
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });
    if (inventory[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  },

  remove: async function(req, res) {
    let inventory = await model.inventory
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });

    if (inventory == 1) STATUS.REMOVED(res, req.body.id);
    else STATUS.NOT_FOUND(res);
  }
};
