const model = require("../models");
const STATUS = require("../utils/resTransformer");
const BULK = require("../services/bulkCreate");

const getConfig = (group_id) => {
  let config = {
    include: [
      {
        model: model.safetyJoin,
        attributes: {
          exclude: ["createdAt", "updatedAt", "safetyGroupId", "safetyItemId"],
        },
        include: {
          model: model.safetyItem,
          attributes: ["id", "safetyItem", "affiliatedWith"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  };
  if (group_id) {
    config["where"] = { id: group_id };
  }
  return config;
};

module.exports = {
  add: async (req, res) => {
    const transaction = await model.sequelize.transaction();
    try {
      let truckId;
      let data = req.body
      if(data.truckId){
        truckId = data.truckId
        delete data.truckId
      }
      let group = await model.safetyGroup.create({ name: data.name });
      let join = await BULK.bulkSafetyGroupCreate(
        data.items,
        group.id,
        "safetyJoin",
        transaction
      );
      if(truckId){
        await model.truckSafety.create({truckId,safetyGroupId:group.id})
      }
      await transaction.commit();

      if (join) {
        let response = await model.safetyGroup.findAll(getConfig(group.id));
        STATUS.ADDED(res, response);
      }
    } catch (err) {
      await transaction.rollback();
      STATUS.DB_ERROR(res, err);
    }
  },
  get: async (req, res) => {
    let items = await model.safetyGroup
      .findAll(getConfig())
      .catch((err) => {
        console.log(err);
        STATUS.DB_ERROR(res, err); // send Database Error
      });
    STATUS.OK(res, items);
  },
  update: async (req, res) => {
    const transaction = await model.sequelize.transaction();
    try {
      await model.safetyGroup.update(
        { name: req.body.name },
        { where: { id: req.body.id } }
      );
      let previousValues = await model.safetyGroup.findAll(getConfig(req.body.id));
      let join = await BULK.bulkSafetyGroupUpdate(
        req.body.items,
        req.body.id,
        transaction,
        previousValues
      );

      await transaction.commit();

      if (join) {
        let response = await model.safetyGroup.findAll(getConfig(req.body.id));
        STATUS.UPDATED(res, response);
      }
    } catch (err) {
      await transaction.rollback();
      STATUS.DB_ERROR(res, err);
    }
  },
};
