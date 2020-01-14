const issue = require("./issue");
const po = require("./po");
const inventory = require("./inventory");

module.exports = router => {
  issue(router);

  po(router);

  inventory(router);

  return router;
};
