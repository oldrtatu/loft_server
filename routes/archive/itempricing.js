const controller = require("../../controller/archive/pricelisting");
const email = require("../../controller/email");

module.exports = (router) => {
  router
    .route("/itemPricing")
    .post(controller.add)
    .get(controller.get)
    .put(controller.update);
  router.route("/itemPricing/sendmail").post(email.send);
};
