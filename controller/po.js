const model = require("../models");

module.exports = {
  get: (req, res) => {
    console.log("123", { ...model.PO });
    res.send("yola");
  },

  add: (req, res) => {
    return;
  },

  update: (req, res) => {
    return;
  },

  remove: (req, res) => {
    return;
  }
};
