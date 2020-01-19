const model = require("../models");

module.exports = {
  bulkUpdate: (data, modelName, transaction, POId) => {
    return new Promise((resolve, reject) => {
      let updates = [];
      for (let obj of data) {
        let d = { ...obj, POId };
        updates.push(
          model[modelName].update(
            d,
            {
              where: { id: d.id }
            },
            { transaction }
          )
        );
      }

      Promise.all(updates)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
