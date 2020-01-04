const model = require("../../models");
const STATUS = require("../../utils/resTransformer");

module.exports = {
  get: async (req, res) => {
    let vendors = await model.vendor
      .findAll({
        include: [
          {
            model: model.address,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "customerId",
                "driverId",
                "locationId",
                "subsidiaryId",
                "vendorId"
              ]
            }
          }
        ]
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err); // send DB_ERROR
      });

    STATUS.OK(res, vendors); // send data with 200
  },

  add: async (req, res) => {
    let vendor = await model.vendor
      .create(req.body, {
        include: [model.address]
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err); // send DB_ERROR
      });

    if (vendor) {
      STATUS.ADDED(res, vendor); // send created data with 201 status
    }
  },

  update: async (req, res) => {
    // update only driver
    let queryResult = await model.vendor
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err);
      });

    let vendor = req.body.address
      ? await model.vendor
          .findByPk(req.body.id, {
            include: model.address
          })
          .catch(err => {
            STATUS.DB_ERROR(res, err);
          })
      : undefined; // check if to update associated address

    if (vendor) {
      if (vendor.address == null)
        await vendor.createAddress(req.body.address).catch(err => {
          STATUS.DB_ERROR(res, err);
        });
      // associate newly created address to vendor
      else
        await model.address
          .update(req.body.address, {
            where: { id: vendor.address.id }
          })
          .catch(err => {
            STATUS.DB_ERROR(res, err);
          }); // update already existing address
    }

    // send data with created status
    if (queryResult[0] == 1) STATUS.UPDATED(res, req.body);
    else STATUS.NOT_FOUND(res); // send not found status
  },

  remove: async (req, res) => {
    let queryResult = await model.vendor
      .destroy({
        where: { id: req.body.id }
      })
      .catch(err => {
        STATUS.DB_ERROR(res, err); // send Database Error
      });

    if (queryResult === 1) STATUS.REMOVED(res, req.body.id); // send deleted address
    else STATUS.NOT_FOUND(res); // not found
  }
};
