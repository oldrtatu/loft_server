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
  bulkSafetyGroupCreate: async (
    data,
    safetyGroupId,
    modelName,
    transaction
  ) => {
    return new Promise((resolve, reject) => {
      let added = [];
      for (let obj of data) {
        added.push(
          model[modelName].create({ ...obj, safetyGroupId }, { transaction })
        );
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
  bulkSafetyGroupUpdate: async (
    data,
    safetyGroupId,
    transaction,
    previousValues
  ) => {
    let previousIds = previousValues[0]["safetyJoins"].map((obj, _) => {
      return obj.id;
    });
    return new Promise((resolve, reject) => {
      let added = [];
      for (let obj of data) {
        let ob = { ...obj, safetyGroupId };
        delete ob.safetyItem;
        delete ob.affiliatedWith;
        let ind = previousIds.indexOf(obj.id);
        if (ind > -1) {
          added.push(
            model.safetyJoin.update(
              ob,
              { where: { id: obj.id } },
              { transaction }
            )
          );
          previousIds.splice(ind, 1);
        } else if (!obj.id) {
          added.push(
            model.safetyJoin.create(
              ob,
              { where: { id: obj.id } },
              { transaction }
            )
          );
        }
      }
      previousIds.map((id, _) => {
        added.push(
          model.safetyJoin.destroy({ where: { id } }, { transaction })
        );
      });
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
