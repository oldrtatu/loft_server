const data = require("./seed_data");
const model = require("../models");

const seed = () => {
  let keys = Object.keys(data);

  let promise = [];

  for (let modelName of keys) {
    data[modelName].map(item => {
      promise.push(model[modelName].create(item));
    });
  }

  Promise.all(promise)
    .then(res => {
      console.log("seeded data");
    })
    .catch(err => {
      console.dir(err);
    });
};

seed();
