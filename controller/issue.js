const model = require("../models");
const STATUS = require("../utils/resTransformer");
const CRONS = require("../jobs/crons");

module.exports = {
  get: async (req, res) => {
    let issues = await model.issue
      .findAll({
        include: [
          {
            model: model.class,
            as: "category",
            attributes: ["id", "name"]
          },
          {
            model: model.subsidiary,
            as: "division",
            attributes: ["id", "name"]
          },
          {
            model: model.truck,
            attributes: ["id", "unitNo"]
          }
        ],
        attributes: {
          exclude: [
            "categoryId",
            "divisionId",
            "createdAt",
            "updatedAt",
            "truckId"
          ]
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err); // send Database Error
      });

    STATUS.OK(res, issues); // send data
  },

  add: async (req, res) => {
    let issue = await model.issue.create(req.body).catch(err => {
      STATUS.DB_ERROR(res, err);
    });

    if (issue) {
      CRONS.Issue(req.body);
      STATUS.ADDED(res, issue);
    }
  },

  remove: async (req, res) => {
    let issue = await model.issue
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });

    if (issue == 1) STATUS.REMOVED(res, req.body.id);
    else STATUS.NOT_FOUND(res);
  },
  update: async (req, res) => {
    let issue = await model.issue
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });
    if (issue[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  }
};
