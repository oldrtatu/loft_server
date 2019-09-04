const express = require("express");
const router = express.Router();
const model = require("../../models");
const logger = require("../../logger/logger");
const util = require("util");
const Error = require("../../utils/Error");

// get all customers
router.get("/", async (req, res, next) => {
  let queryResult = await model.customer
    .findAll({
      include: [
        {
          model: model.billTo
        },
        {
          model: model.notification
        },
        {
          model: model.contact
        },
        {
          model: model.notes
        },
        {
          model: model.address
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })
    .catch(err => {
      console.log(err);
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });
  res.status(200).json(queryResult);
});

// create a customer
router.post("/", async (req, res, next) => {
  // now add customer
  let customer = await model.customer
    .create(req.body, {
      include: [
        model.billTo,
        model.notification,
        model.notes,
        model.address,
        model.contact
      ]
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
      res.end();
    });

  if (customer) {
    res.status(201).json({
      code: "ADD_SUCC",
      response: customer
    });
  }
});

// update a customer
router.put("/", async (req, res, next) => {
  // update only customer
  let queryResult = await model.customer
    .update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  // update billTo
  let customer =
    req.body.billTo || req.body.address || req.body.notification
      ? await model.customer
          .findByPk(req.body.id, {
            include: [model.billTo, model.address, model.notification]
          })
          .catch(err => {
            let response = Error.SequelizeErrorFormat(err);
            res.status(400).send(response);
          })
      : undefined;

  // update billTo
  if (customer["billTo"] == null) {
    let result = await customer.createBillTo(req.body.billTo).catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });
  } else {
    let result = await model.billTo
      .update(req.body.billTo, {
        where: {
          id: customer.billTo.id
        }
      })
      .catch(err => {
        let response = Error.SequelizeErrorFormat(err);
        res.status(400).send(response);
      });
  }

  // update notification
  if (customer["notification"] == null) {
    let result = await customer
      .createNotification(req.body.notification)
      .catch(err => {
        let response = Error.SequelizeErrorFormat(err);
        res.status(400).send(response);
      });
  } else {
    let result = await model.notification
      .update(req.body.notification, {
        where: {
          id: customer.notification.id
        }
      })
      .catch(err => {
        let response = Error.SequelizeErrorFormat(err);
        res.status(400).send(response);
      });
  }

  // update address
  if (customer["address"] == null) {
    let result = await customer.createAddress(req.body.address).catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });
  } else {
    let result = await model.address
      .update(req.body.address, {
        where: {
          id: customer.address.id
        }
      })
      .catch(err => {
        let response = Error.SequelizeErrorFormat(err);
        res.status(400).send(response);
      });
  }

  // send the response
  if (queryResult[0] === 1) {
    res.status(200).json({
      code: "UPDATE_SUCC"
    });
  } else {
    res.status(200).json({
      code: "UPDATE_FAIL",
      message: "ID doesn't exist"
    });
  }
});

// delete a customer
router.delete("/", async (req, res, next) => {
  let queryResult = await model.customer
    .destroy({
      where: { id: req.body.id }
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (queryResult === 1) {
    res.status(200).json({
      code: "DELETE_SUCC",
      response: {
        id: req.body.id
      }
    });
  } else {
    res.status(200).json({
      code: "DELETE_FAIL",
      message: "ID doesn't exist"
    });
  }
});

// exports the router
module.exports = router;
