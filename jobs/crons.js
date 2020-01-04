const DateHelpers = require("../utils/DateHelpers");

module.exports = {
  Issue: issue => {
    if (issue.type != "RECURRENCE" && issue.status != "DEFERRED") return;

    // get the data
    let job = {};
    job.model = "issue";

    // if issue's status is deferred
    if (issue.status == "DEFERRED") {
      job.jobType = "UPDATE";
      job.data = {
        status: "OPEN"
      };
      job.date = issue.dueOn;
    }

    // check if it has re-currence issue and doesn't have
    if (issue.type == "RECURRENCE" && issue.status != "DEFERRED") {
      job.type = "ADD";
      job.data = issue;

      job.date = DateHelpers.addPeriodTodate(
        issue.postedOn,
        issue.period,
        issue.periodUnit
      );

      job.period = issue.period;
      job.periodUnit = issue.periodUnit;
      job.recurrent = true;
    }
  }
};
