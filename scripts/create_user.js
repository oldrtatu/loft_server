const models = require("../models");
const uuidv1 = require("uuid/v1");
const readline = require("readline-sync");

const user = () => {
  let data = {};

  data.firstName = readline.question("What is your first name? ");

  data.lastName = readline.question("What is your last name? ");

  data.email = readline.question("What is your email address? ");

  data.password = getPassword();

  data.uid = uuidv1();

  models.user
    .create(data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

getPassword = () => {
  let password = readline.question("Enter password ", { hideEchoBack: true });

  let password_again = readline.question("Enter your password again ", {
    hideEchoBack: true
  });

  if (password !== password_again) {
    console.log("\nPassword was incorrect. Please re-enter again\n");
    return getPassword();
  } else {
    return password;
  }
};

user();
