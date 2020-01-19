const todo = require("../controller/todo");
const task = require("../controller/task");

module.exports = router => {
  router
    .route("/todo")
    .post(todo.add)
    .put(todo.update)
    .delete(todo.remove);

  router
    .route("/task")
    .post(task.add)
    .put(task.update)
    .delete(task.remove);

  return router;
};
