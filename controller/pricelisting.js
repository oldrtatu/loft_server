const model = require("../models");
const STATUS = require("../utils/resTransformer");
const BULK = require("../services/bulkCreate");

module.exports = {
  add: async (req, res) => {
    let items;
    try {
      items = await BULK.bulkCreate(req.body, "priceListing");
      if (items) {
        STATUS.ADDED(res, items);
      }
    } catch (err) {
      STATUS.DB_ERROR(res, err);
    }
  },
  get: async (req, res) => {
    let items = await model.priceListing.findAll().catch((err) => {
      STATUS.DB_ERROR(res, err); // send Database Error
    });
    STATUS.OK(res, items);
  },
};
