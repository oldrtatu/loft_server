// import modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// import custom modules
const logger = require("./logger/logger");
const validateToken = require("./utils").validateToken;
const schedule = require("./jobs/schedule");
// implement app
const app = express();
const router = express.Router();

// import routes
const archive = require("./routes/archive/");
const root = require("./routes/");
const attachment = require("./routes/attachment.js");
const login = require("./routes/login");
const po = require("./routes/po");

// middleware

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors enabled
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.sendStatus(200);
  } else {
    next();
  }
});

global.__basedir = __dirname;

/**
 * @routes implementation
 * 1. root Route
 * 2. archive Route
 * 3. Attachment Route
 *
 */

// jobs
schedule.start();

// login route without validation

app.use("/login", login(router));

// validate Users
app.use("/", validateToken);

app.use("/", root(router));

// purchase order
app.use("/po", po(router));

// archive route
app.use("/archive", archive);

// file upload route
app.use("/uploads", attachment);

module.exports = app;
