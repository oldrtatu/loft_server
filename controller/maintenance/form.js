const model = require("../../models");
const STATUS = require("../../utils/resTransformer");

module.exports = {
  get: async (req, res) => {
    let forms = await model.form.findAll().catch((err) => {
      STATUS.DB_ERROR(res, err); // send DB_ERROR
    });

    STATUS.OK(res, forms); // send data with 200
  },
  add: async (req, res) => {
    let form = await model.form.create(req.body).catch((err) => {
      STATUS.DB_ERROR(res, err);
    });

    if (form) {
      STATUS.ADDED(res, form);
    }
  },
  update: async (req, res) => {
    let form = await model.form
      .update(req.body, {
        where: {
          id: req.body.id,
        },
      })
      .catch((err) => {
        STATUS.DB_ERROR(res, err);
      });
    if (form[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  },
  remove: async (req, res) => {
    let form = await model.form
      .destroy({
        where: {
          id: req.body.id,
        },
      })
      .catch((err) => {
        STATUS.DB_ERROR(res, err);
      });

    if (form == 1) STATUS.REMOVED(res, req.body.id);
    else STATUS.NOT_FOUND(res);
  },
};
