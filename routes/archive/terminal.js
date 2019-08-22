const express = require("express");
const router = express.Router();
const model = require("../../models");
const logger = require("../../logger/logger");
const util = require("util");
const Error = require("../../utils/Error");

// get all Terminals
router.get("/", async (req, res, next) => {
  let terminal = await model.terminal
    .findAll({
      include: [
        {
          model: model.location,
          as: "location",
          attributes: ["id", "name"]
        },
        {
          model: model.service,
          as: "service",
          attributes: ["id", "name"]
        }
      ],
      attributes: {
        exclude: ["locationId", "serviceId", "createdAt", "updatedAt"]
      }
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      console.log(response);
      res.status(400).send(response);
    });
  res.status(200).json(terminal);
});

// create a terminal
router.post("/", async (req, res, next) => {
  let terminal = await model.terminal.create(req.body).catch(err => {
    let response = Error.SequelizeErrorFormat(err);
    res.status(400).send(response);
    res.end();
  });

  if (terminal) {
    res.status(201).json({
      code: "ADD_SUCC",
      response: terminal
    });
  }
});

// update a terminal
router.put("/", async (req, res, next) => {
  let terminal = await model.terminal
    .update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (terminal[0] === 1) {
    res.status(200).json({
      code: "UPDATE_SUCC",
      response: req.body
    });
  } else {
    res.status(200).json({
      code: "UPDATE_FAIL",
      message: "ID doesn't exist"
    });
  }
});

// delete a terminal
router.delete("/", async (req, res, next) => {
  let terminal = await model.terminal
    .destroy({
      where: { id: req.body.id }
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (terminal === 1) {
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
