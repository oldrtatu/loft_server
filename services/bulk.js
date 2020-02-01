const model = require("../models");

module.exports = {
  bulkUpdate: async (data, modelName, transaction, POId) => {
    return new Promise((resolve, reject) => {
      let updates = [];
	    console.log(data)
      for (let obj of data) {
        let d;
        if (obj.status != "OPEN") {
          d = { ...obj, POId };
        } else {
          d = { ...obj, POId: null };
        }
	console.log(d)
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
