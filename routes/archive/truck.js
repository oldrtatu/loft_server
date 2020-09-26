const express = require("express");
const router = express.Router();
const model = require("../../models");
const logger = require("../../logger/logger");
const util = require("util");
const Error = require("../../utils/Error");
const DateHelpers = require("../../utils/DateHelpers");
const STATUS = require("../../utils/resTransformer");

let config = {
  include: [
    {
      model: model.class,
      as: "category",
      attributes: ["id", "name"],
    },
    {
      model: model.subsidiary,
      as: "division",
      attributes: ["id", "name"],
    },
    {
      model: model.truckRegistration,
      attributes: {
        exclude: ["truckId", "createdAt", "updatedAt"],
      },
    },
    {
      model: model.truckOdometer,
      attributes: {
        exclude: ["truckId", "createdAt", "updatedAt"],
      },
    },
    {
      model: model.truckSafety,
      attributes: {
        exclude: ["createdAt", "updatedAt", "truckId"],
      },
    },
  ],
  attributes: {
    exclude: ["categoryId", "divisionId", "createdAt", "updatedAt"],
  },
};

// get all trucks
router.get("/", async (req, res, next) => {
  let queryResult = await model.truck.findAll(config).catch((err) => {
    console.log(err);
    let response = Error.SequelizeErrorFormat(err);
    res.status(400).send(response);
  });
  let result = JSON.parse(JSON.stringify(queryResult));
  result.map((truck, _) => {
    console.log(truck);
    truck.truckOdometer.odometerDate = DateHelpers.formatDate(
      truck.truckOdometer.odometerDate
    );
  });
  res.status(200).json(result);
});

// create a truck
router.post("/", async (req, res, next) => {
  // now add truck

  let data = JSON.parse(JSON.stringify(req.body));
  data["truckOdometer"] = {
    odometer: 0,
    odometerUnit: "MILES",
    odometerDate: new Date(),
  };
  let truck = await model.truck
    .create(data, {
      include: [model.truckRegistration, model.truckOdometer],
    })
    .catch((err) => {
      let response = Error.SequelizeErrorFormat(err);
      console.log(response);
      res.status(400).send(response);
      res.end();
    });

  if (truck) {
    res.status(201).json({
      code: "ADD_SUCC",
      response: truck,
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
          id: req.body.id,
        },
      })
      .catch((err) => {
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
          include: model.truckRegistration,
        })
        .catch((err) => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
        })
    : undefined;

  // if truck !== undefined
  if (truck) {
    if (truck.truckRegistration === null) {
      truckRegistration = await truck
        .createTruckRegistration(req.body.truckRegistration)
        .catch((err) => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
          res.end();
        });
    } else {
      truckRegistration = await model.truckRegistration
        .update(req.body.truckRegistration, {
          where: {
            id: truck.truckRegistration.id,
          },
        })
        .catch((err) => {
          let response = Error.SequelizeErrorFormat(err);
          res.status(400).send(response);
          res.end();
        });
    }
  }

  // send the response
  if (queryResult && queryResult[0] === 1) {
    res.status(200).json({
      code: "UPDATE_SUCC",
    });
    res.end();
  } else {
    res.status(200).json({
      code: "UPDATE_FAIL",
      message: "ID doesn't exist",
    });
    res.end();
  }
});

// delete a truck
router.delete("/", async (req, res, next) => {
  let queryResult = await model.truck
    .destroy({
      where: { id: req.body.id },
    })
    .catch((err) => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });

  if (queryResult === 1) {
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

//update odometer
router.put("/updateOdometer", async (req, res, next) => {
  try {
    let data = req.body;
    let truckId = data.truckId;
    data.odometer = data.odometerNew;
    if (data.odometerUnit == "KM") {
      data.odometer = (parseFloat(data.odometerNew) * 0.6213).toString();
    } else {
      data.odometer = parseFloat(data.odometerNew).toString();
    }
    data.odometerUnit = "MILES";
    data.odometerDate = new Date(data.odometerDateNew);

    delete data.odometerNew;
    delete data.odometerDateNew;
    delete data.truckId;

    let queryResult = await model.truckOdometer.update(data, {
      where: { id: data.id },
    });
    if (queryResult) {
      let truck = await model.truck.findOne({
        where: { id: truckId },
        ...config,
      });
      truck = JSON.parse(JSON.stringify(truck));
      truck.truckOdometer.odometerDate = DateHelpers.formatDate(
        truck.truckOdometer.odometerDate
      );
      STATUS.UPDATED(res, truck);
    }
  } catch (err) {
    console.log(err);
    STATUS.DB_ERROR(res, err);
  }
});

router.post("/linkGroups", async (req, res, next) => {
  let truckId = req.body.truckId;
  try {
    let previousIds = await model.truckSafety.findAll({ where: { truckId } });
    let newIds = [...req.body.ids];
    let groups = JSON.parse(JSON.stringify(previousIds));
    let removeIds = [];
    groups.map((group, _) => {
      if (newIds.indexOf(group.safetyGroupId) > -1) {
        newIds.splice(newIds.indexOf(group.safetyGroupId), 1);
      } else {
        removeIds.push(group.id);
      }
    });
    newIds.map(async (id, _) => {
      await model.truckSafety.create({ truckId, safetyGroupId: id });
    });
    removeIds.map(async (id, _) => {
      await model.truckSafety.destroy({ where: { id } });
    });
    STATUS.ADDED(res, previousIds);
  } catch (err) {
    console.log(err);
    STATUS.DB_ERROR(res, err);
  }
});

// exports the router
module.exports = router;
