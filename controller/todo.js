const model = require("../models");
const STATUS = require("../utils/resTransformer");

module.exports = {
  add: async (req, res) => {
    let todo = await model.todo.create(req.body).catch(err => {
      STATUS.DB_ERROR(res, err);
    });

    if (todo) {
      STATUS.ADDED(res, todo);
    }
  },

  remove: async (req, res) => {
    let todo = await model.todo
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });

    if (todo == 1) STATUS.REMOVED(res, req.body.id);
    else STATUS.NOT_FOUND(res);
  },

  update: async (req, res) => {
    let todo = await model.todo
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });
    if (todo[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  }
};
