const controller = require("../../controller/archive/pricelisting");

module.exports = (router) => {
  router.route("/itemPricing").post(controller.add).get(controller.get).put(controller.update);
};
