const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const config = require('../config/db_config')
const db = {};

let sequelize = new Sequelize(
  config.mysql.DB_NAME, config.mysql.DB_USER, config.mysql.DB_PASSWORD, {
  dialect : config.mysql.DIALECT,
  host : config.mysql.DB_HOST,
  logging : false // till now it is false
})

// sequelize.authenticate
/*
  connect to mysql shell = ? \connect user@host:port
  if the error is -> Client does not support authentication protocol requested by server
  then(
    (changepassword) => ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
  )
  then(
    (privileges) => flush privileges;
  )

*/
sequelize
.authenticate()
.then(() => console.log("connected to mysql"))
.catch((err) => {
  console.error(err)
  process.exit(1)
})



// add all the models in the models directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import((path.join(__dirname, file)));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
