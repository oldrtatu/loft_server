const express = require("express");
const router = express.Router();

// import all the archive routes
const service = require("./service");
const department = require("./department");
const Class = require("./class");
const paymentTerm = require("./paymentTerm");
const subsidary = require("./subsidiary");
const truck = require("./truck");
const driver = require("./driver");
const location = require("./location");
const terminal = require("./terminal");
const contact = require("./contact");
const customer = require("./customer");

router.get("/", (req, res, next) => {
  res.status(400).json({ message: "yay" });
});

router.use("/service", service);
router.use("/department", department);
router.use("/class", Class);
router.use("/payterm", paymentTerm); // Payment Term Route
router.use("/subsidiary", subsidary);
router.use("/truck", truck);
router.use("/driver", driver);
router.use("/location", location);
router.use("/terminal", terminal);
router.use("/contact", contact);
router.use("/customer", customer);

module.exports = router;
