const model = require("../models");
const STATUS = require("../utils/resTransformer");
const BULK = require("../services/bulk");

module.exports = {
  get: async (req, res) => {
    let po = await model.PO.findAll({
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
          model: model.user,
          as: "createdBy",
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: model.issue
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
    }).catch(err => {
      console.dir(err);
      STATUS.DB_ERROR(res, err); // send Database Error
    });

    STATUS.OK(res, po); // send data
  },

  add: async (req, res) => {
    console.log("here");
    const transaction = await model.sequelize.transaction();
    let po;
    try {
      po = await model.PO.create(req.body);
      if (req.body.issues && req.body.poType == "ISSUES") {
        let issue = await BULK.bulkUpdate(
          req.body.issues,
          "issue",
          transaction,
          po.id
        );
      }

      await transaction.commit();

      if (po) {
        STATUS.ADDED(res, po);
      }
    } catch (err) {
      console.dir(err);
      await transaction.rollback();
      STATUS.DB_ERROR(res, err);
    }
  },

  remove: async (req, res) => {
    let po = await model.PO.destroy({
      where: {
        id: req.body.id
      }
    }).catch(err => {
      STATUS.DB_ERROR(res, err);
    });

    if (po == 1) STATUS.REMOVED(res, req.body.id);
    else STATUS.NOT_FOUND(res);
  },

  update: async (req, res) => {
    const transaction = await model.sequelize.transaction();
    let po;
    try {
      po = await model.PO.update(req.body, { where: { id: req.body.id } });
      if (req.body.issues) {
        let issue = await BULK.bulkUpdate(
          req.body.issues,
          "issue",
          transaction,
	req.body.id
        );
      }
    } catch (err) {
	    console.log(err);
      STATUS.DB_ERROR(res, err);
    }

    if (po[0] == 1) {
      STATUS.UPDATED(res, req.body);
    } else {
      STATUS.NOT_FOUND(res);
    }
  }
};
