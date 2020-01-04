const model = require("../models");
const JOBS = require("./jobs");
const cron = require("node-cron");

module.exports = {
  start: () => {
    //  * * * * * *
    //  | | | | | |
    //  | | | | | day of week
    //  | | | | month
    //  | | | day of month
    //  | | hour
    //  | minute
    //  second ( optional )
    // this job will run every midnight
    cron.schedule("0 0 0 * * *", () => {
      // get all today's job
      // execute them
      return;
    });
  },
  processTask: () => {
    return;
  }
};
