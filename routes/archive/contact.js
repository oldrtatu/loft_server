const express = require("express");
const router = express.Router();
const model = require("../../models");
const logger = require("../../logger/logger");
const util = require("util");
const Error = require("../../utils/Error");

// get all Contacts
router.get("/", async (req, res, next) => {
  let contact = await model.contact
    .findAll({
      include: [
        {
          model: model.customer
        }
      ],
      attributes: {
        exclude: ["customerId", "createdAt", "updatedAt"]
      }
    })
    .catch(err => {
      console.log(err);
      let response = Error.SequelizeErrorFormat(err);
      console.log(response);
      res.status(400).send(response);
    });
  res.status(200).json(contact);
});

// create a contact
router.post("/", async (req, res, next) => {
  let contact = await model.contact.create(req.body).catch(err => {
    let response = Error.SequelizeErrorFormat(err);
    res.status(400).send(response);
    res.end();
  });

  if (contact) {
    res.status(201).json({
      code: "ADD_SUCC",
      response: contact
    });
  }
});

// update a contact
router.put("/", async (req, res, next) => {
  let contact = await model.contact
    .update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (contact[0] === 1) {
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

// delete a contact
router.delete("/", async (req, res, next) => {
  let contact = await model.contact
    .destroy({
      where: { id: req.body.id }
    })
    .catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (contact === 1) {
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
