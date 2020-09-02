const model = require("../models");
const STATUS = require("../utils/resTransformer");

module.exports = {
  add: async (req, res) => {
    let item;
    try {
      item = await model.safetyItem.create(req.body, "safetyItem");
      if (item) {
        STATUS.ADDED(res, item);
      }
    } catch (err) {
      STATUS.DB_ERROR(res, err);
    }
  },
  get: async (req, res) => {
    let items = await model.safetyItem.findAll().catch((err) => {
      STATUS.DB_ERROR(res, err); // send Database Error
    });
    STATUS.OK(res, items);
  },
  update: async(req,res) => {
    let item = await model.safetyItem.update(req.body, { where: { id: req.body.id } }).catch((err)=>{
      STATUS.DB_ERROR(res,err)
    })
    if (item[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  }
};
