const model = require("../../models");
const STATUS = require("../../utils/resTransformer");

module.exports = {
  get: async (req, res) => {
    let items = await model.item
      .findAll({
        include: [
          {
            model: model.class,
            as: "category",
            attributes: ["id", "name"]
          }
        ]
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err); // send DB_ERROR
      });

    STATUS.OK(res, items); // send data with 200
  },
  add: async (req, res) => {
    let item = await model.item.create(req.body).catch(err => {
      STATUS.DB_ERROR(res, err); // send DB_ERROR
    });

    if (item) {
      STATUS.ADDED(res, item); // send created data with 201 status
    }
  },
  update: async (req, res) => {
    let item = await model.item
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });
    if (item[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  },
  remove: async (req, res) => {
    let item = await model.item
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });

    if (item == 1) STATUS.REMOVED(res, req.body.id);
    else STATUS.NOT_FOUND(res);
  }
};
