const controller = require("../../controller/maintenance/form");

module.exports = (router) => {
  router
    .route("/form")
    .get(controller.get)
    .post(controller.add)
    .put(controller.update)
    .delete(controller.remove);
};
