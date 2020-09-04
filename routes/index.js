const controller = require("../controller/user");
const safetyitem = require("../controller/safety");
const safetygroup = require("../controller/safetygroup");
const todo = require("./todo");

module.exports = (router) => {
  router
    .route("/users")
    .post(controller.add)
    .put(controller.update)
    .get(controller.get)
    .delete(controller.delete);

  router.route("/login").post(controller.login);

  router.route("/changePassword").post(controller.changePassword);

  router
    .route("/safety")
    .post(safetyitem.add)
    .get(safetyitem.get)
    .put(safetyitem.update);

  router
    .route("/safetygroup")
    .post(safetygroup.add)
    .get(safetygroup.get)
    .put(safetygroup.update);

  todo(router);
  return router;
};
