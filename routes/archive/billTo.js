const express = require("express");
const router = express.Router();
const model = require("../../models");
const logger = require("../../logger/logger");
const util = require("util");
const Error = require("../../utils/Error");

// create a contact
router.post("/", async (req, res, next) => {
  let billTo = await model.billTo.create(req.body).catch((err) => {
    let response = Error.SequelizeErrorFormat(err);
    res.status(400).send(response);
    res.end();
  });

  if (billTo) {
    res.status(201).json({
      code: "ADD_SUCC",
      response: billTo,
    });
  }
});

// update a contact
router.put("/", async (req, res, next) => {
  let billTo = await model.billTo
    .update(req.body, {
      where: {
        id: req.body.id,
      },
    })
    .catch((err) => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (billTo[0] === 1) {
    res.status(200).json({
      code: "UPDATE_SUCC",
      response: req.body,
    });
  } else {
    res.status(200).json({
      code: "UPDATE_FAIL",
      message: "ID doesn't exist",
    });
  }
});

// delete a contact
router.delete("/", async (req, res, next) => {
  let billTo = await model.billTo
    .destroy({
      where: { id: req.body.id },
    })
    .catch((err) => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (billTo === 1) {
    res.status(200).json({
      code: "DELETE_SUCC",
      response: {
        id: req.body.id,
      },
    });
  } else {
    res.status(200).json({
      code: "DELETE_FAIL",
      message: "ID doesn't exist",
    });
  }
});

// exports the router
module.exports = router;
