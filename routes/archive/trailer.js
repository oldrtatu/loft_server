const express = require("express");
const router = express.Router();
const model = require("../../models");
const logger = require("../../logger/logger");
const util = require("util");
const Error = require("../../utils/Error");

// get all trailers
router.get("/", async (req, res, next) => {
  let queryResult = await model.trailer
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
          model: model.trailerRegistration,
          attributes: {
            exclude: ["trailerId", "createdAt", "updatedAt"]
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

// create a trailer
router.post("/", async (req, res, next) => {
  // now add trailer
  let trailer = await model.trailer
    .create(req.body, {
      include: [model.trailerRegistration]
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      console.log(response);
      res.status(400).send(response);
      res.end();
    });

  if (trailer) {
    res.status(201).json({
      code: "ADD_SUCC",
      response: trailer
    });
  }
});

// update a trailer
router.put("/", async (req, res, next) => {
  // update only trailer

  let queryResult;

  try {
    queryResult = await model.trailer
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

  // now get related trailer to the registration if request body object has registration object
  let trailer = req.body.trailerRegistration
    ? await model.trailer
        .findByPk(req.body.id, {
          include: model.trailerRegistration
        })
        .catch(err => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
        })
    : undefined;

  // if trailer !== undefined
  if (trailer) {
    if (trailer.trailerRegistration === null) {
      trailerRegistration = await trailer
        .createtrailerRegistration(req.body.trailerRegistration)
        .catch(err => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
          res.end();
        });
    } else {
      trailerRegistration = await model.trailerRegistration
        .update(req.body.trailerRegistration, {
          where: {
            id: trailer.trailerRegistration.id
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

// delete a trailer
router.delete("/", async (req, res, next) => {
  let queryResult = await model.trailer
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
