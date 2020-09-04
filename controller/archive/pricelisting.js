const model = require("../../models");
const STATUS = require("../../utils/resTransformer");
const BULK = require("../../services/bulkCreate");
const item = require("./item");

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function FormatData(item) {
  let data = JSON.parse(JSON.stringify(item));
  data.quotationDate = formatDate(data.quotationDate);
  data["warranty"] = {
    warrantyAvailable: data.warrantyAvailable,
    warrantyProvider: data.warrantyProvider,
    period: data.period,
    periodUnit: data.periodUnit,
    mileage: data.mileage,
    mileageUnit: data.mileageUnit,
    notes: data.notes,
  };
  delete data.warrantyProvider;
  delete data.warrantyAvailable;
  delete data.period;
  delete data.periodUnit;
  delete data.mileage;
  delete data.mileageUnit;
  delete data.notes;
  return data;
}

module.exports = {
  add: async (req, res) => {
    let items;
    try {
      items = await BULK.bulkCreate(req.body, "priceListing");
      if (items) {
        let ob = FormatData(items[0]);
        STATUS.ADDED(res, ob);
      }
    } catch (err) {
      STATUS.DB_ERROR(res, err);
    }
  },
  get: async (req, res) => {
    let items = await model.priceListing.findAll().catch((err) => {
      STATUS.DB_ERROR(res, err); // send Database Error
    });

    let ob = [];
    items.map((item, _) => {
      let t = FormatData(item);
      ob.push(t);
    });
    STATUS.OK(res, ob);
  },
  update: async (req, res) => {
    let item;
    try {
      let data = req.body;
      item = await model.priceListing.update(data, { where: { id: data.id } });
      if (item[0] == 1) {
        let ob = FormatData(data);
        STATUS.UPDATED(res, ob);
      }
    } catch (err) {
      console.log(err);
      STATUS.DB_ERROR(res, err);
    }
  },
};
