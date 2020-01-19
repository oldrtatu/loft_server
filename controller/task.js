const model = require("../models");
const STATUS = require("../utils/resTransformer");

module.exports = {
  add: async (req, res) => {
    let task = await model.task.create(req.body).catch(err => {
      STATUS.DB_ERROR(res, err);
    });

    if (task) {
      STATUS.ADDED(res, task);
    }
  },

  remove: async (req, res) => {
    let task = await model.task
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });

    if (task == 1) STATUS.REMOVED(res, req.body.id);
    else STATUS.NOT_FOUND(res);
  },

  update: async (req, res) => {
    let task = await model.task
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });
    if (task[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  }
};
