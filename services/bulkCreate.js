const model = require("../models");

module.exports = {
  bulkCreate: async (data, modelName) => {
    return new Promise((resolve, reject) => {
      let added = [];
      for (let obj of data) {
        added.push(model[modelName].create(obj));
      }
      Promise.all(added)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
