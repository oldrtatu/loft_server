const controller = require("../controller/user");
const pricelisting = require("../controller/pricelisting");
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

  router.route("/pricelisting").post(pricelisting.add);
  router.route("/pricelisting").get(pricelisting.get);

  todo(router);
  return router;
};
