const model = require("../models");
const STATUS = require("../utils/resTransformer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.sendgrid_key);

module.exports = {
  send: async (req, res) => {
    let vendors;
    try {
      vendors = await model.vendor.findAll();
      vendors.map((vendor, _) => {
        let vendorName = vendor.name.split(" ").join("%20");
        let url =
          (process.env.URL || "http://localhost:3000/") +
          "?vendorId=" +
          vendor.id +
          "&vendorName=" +
          vendorName;

        let msg = {
          to: vendor.email,
          from: "yashmalik23@gmail.com",
          subject: "Lofty Logistics is requesting for pricing quotes",
          html: "<h4>Please send us the pricing quotes from the below URL:</h4><br/>" + url,
        };
        sgMail.send(msg);
      });
      if (vendors) {
        STATUS.UPDATED(res, "done");
      }
    } catch (err) {
      STATUS.DB_ERROR(res, err);
    }
  },
};
