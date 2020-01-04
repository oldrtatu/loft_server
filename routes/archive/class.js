const express = require("express");
const router = express.Router();
const model = require("../../models");
const STATUS = require("../../utils/resTransformer");

// get all classes
router.get("/", async (req, res, next) => {
  let Class = await model.class.findAll({}).catch(err => {
    STATUS.DB_ERROR(res, err);
  });

  STATUS.OK(res, Class);
});

// create a class
router.post("/", async (req, res, next) => {
  let Class = await model.class
    .create({
      name: req.body.name,
      associationWith: req.body.associationWith,
      status: req.body.status,
      colorCode: req.body.colorCode
    })
    .catch(err => {
      STATUS.DB_ERROR(res, err);
    });

  if (Class) {
    STATUS.ADDED(res, Class);
  }
});

// update a class
router.put("/", async (req, res, next) => {
  let Class = await model.class
    .update(
      {
        name: req.body.name,
        associationWith: req.body.associationWith,
        status: req.body.status,
        colorCode: req.body.colorCode
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
    .catch(err => {
      STATUS.DB_ERROR(res, err);
    });

  if (Class[0] === 1) {
    STATUS.UPDATED(res, req.body);
  } else {
    STATUS.NOT_FOUND(res);
  }
});

// delete a class
router.delete("/", async (req, res, next) => {
  let Class = await model.class
    .destroy({
      where: { id: req.body.id }
    })
    .catch(err => {
      STATUS.DB_ERROR(res, err);
    });

  if (Class === 1) {
    STATUS.REMOVED(res, req.body.id);
  } else {
    STATUS.NOT_FOUND(res);
  }
});

// exports the router
module.exports = router;
