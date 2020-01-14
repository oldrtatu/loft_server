const controller = require("../../controller/archive/item");

module.exports = router => {
  router
    .route("/item")
    .get(controller.get)
    .post(controller.add)
    .put(controller.update)
    .delete(controller.remove);
};
