const express = require("express");
const router = express.Router();
const model = require("../../models");
const logger = require("../../logger/logger");
const util = require("util");
const Error = require("../../utils/Error");

// get all trucks
router.get("/", async (req, res, next) => {
  let queryResult = await model.truck
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
          model: model.truckRegistration,
          attributes: {
            exclude: ["truckId", "createdAt", "updatedAt"]
          }
        }
      ],
      attributes: {
        exclude: ["categoryId", "divisionId", "createdAt", "updatedAt"]
      }
    })
    .catch(err => {
      console.log(err);
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });
  res.status(200).json(queryResult);
});

// create a truck
router.post("/", async (req, res, next) => {
  // now add truck

  console.log(req.body);
  let truck = await model.truck
    .create(req.body, {
      include: [model.truckRegistration]
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      console.log(response);
      res.status(400).send(response);
      res.end();
    });

  if (truck) {
    res.status(201).json({
      code: "ADD_SUCC",
      response: truck
    });
  }
});

// update a truck
router.put("/", async (req, res, next) => {
  // update only truck

  let queryResult;

  console.log(req.body, "check");

  try {
    queryResult = await model.truck
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        let response = Error.SequelizeErrorFormat(err);
        res.status(400).send(response);
        res.end();
      });
  } catch (err) {
    console.log(err, "1222");
  }

  // now get related truck to the registration if request body object has registration object
  let truck = req.body.truckRegistration
    ? await model.truck
        .findByPk(req.body.id, {
          include: model.truckRegistration
        })
        .catch(err => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
        })
    : undefined;

  // if truck !== undefined
  if (truck) {
    if (truck.truckRegistration === null) {
      truckRegistration = await truck
        .createTruckRegistration(req.body.truckRegistration)
        .catch(err => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
          res.end();
        });
    } else {
      truckRegistration = await model.truckRegistration
        .update(req.body.truckRegistration, {
          where: {
            id: truck.truckRegistration.id
          }
        })
        .catch(err => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
          res.end();
        });
    }
  }

  // send the response
  if (queryResult && queryResult[0] === 1) {
    res.status(200).json({
      code: "UPDATE_SUCC"
    });
    res.end();
  } else {
    res.status(200).json({
      code: "UPDATE_FAIL",
      message: "ID doesn't exist"
    });
    res.end();
  }
});

// delete a truck
router.delete("/", async (req, res, next) => {
  let queryResult = await model.truck
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
