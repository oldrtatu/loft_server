const controller = require("../controller/user");
const todo = require("./todo");

module.exports = router => {
  router
    .route("/users")
    .post(controller.add)
    .put(controller.update)
    .get(controller.get)
    .delete(controller.delete);

  router.route("/login").post(controller.login);

  router.route("/changePassword").post(controller.changePassword);

  todo(router);
  return router;
};
