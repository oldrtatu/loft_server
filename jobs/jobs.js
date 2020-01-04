const model = require("../models");

module.exports = {
  ADD: async data => {
    let job = await model.job.create(data).catch(err => {
      console.log(err);
    });

    console.job(job);
    return;
  },
  UPDATE: async data => {
    let job = await model.job
      .update(data, { where: { id: data.id } })
      .catch(err => {
        console.log(err);
      });

    if (job[0] == 1) return true;
    else return false;
  },
  REMOVE: async id => {
    let job = await model.job.destroy({ where: { id } }).catch(err => {
      console.log(err);
    });

    if (job == 1) return true;
    else return false;
  },
  GET: async () => {
    let jobs = await model.job.findAll({}).catch(err => {
      console.log(err);
    });

    // all the jobs
    return jobs;
  }
};
