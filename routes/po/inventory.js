const controller = require("../../controller/inventory");

module.exports = router => {
  router
    .route("/inventory")
    .get(controller.get)
    .post(controller.add)
    .put(controller.update)
    .delete(controller.remove);
};
