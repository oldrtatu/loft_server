const model = require("../models");
const Error = require("../utils/Error");
const Filter = require("../utils/filter");
const uuidv1 = require("uuid/v1");
const Token = require("../utils/Token");

module.exports = {
  add: async (req, res) => {
    let data = Filter.onAdd(req.body);

    if (!data) {
      res.status(400).json({
        code: "ERROR",
        response: "No Data Found"
      });
    }

    data.uid = uuidv1();

    let user = await model.user.create(data).catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
      res.end();
    });

    if (user) {
      res.status(201).json({
        code: "ADD_SUCC",
        response: user
      });
    }
  },

  update: async (req, res) => {
    let data = Filter.onUpdate(req, body);

    if (!data) {
      res.status(400).json({
        code: "ERROR",
        response: "No Data Found"
      });
    }

    let update_data = data.data;
    let id = data.id;

    let user = await model.user
      .update(update_data, {
        where: {
          id
        }
      })
      .catch(err => {
        let response = Error.SequelizeErrorFormat(err);
        res.status(400).send(response);
      });

    if (user[0] === 1) {
      res.status(200).json({
        code: "UPDATE_SUCC",
        response: req.body
      });
    } else {
      res.status(200).json({
        code: "UPDATE_FAIL",
        message: "ID doesn't exist"
      });
    }
  },

  get: async (req, res) => {
    let users = await model.user.findAll({}).catch(err => {
      let response = Error.SequelizeErrorFormat(err);
      res.status(400).send(response);
    });
    res.status(200).json(users);
  },

  delete: async (req, res) => {
    let user = await model.user
      .destroy({
        where: { id: req.body.id }
      })
      .catch(err => {
        let response = Error.SequelizeErrorFormat(err);
        res.status(400).send(response);
      });

    if (user === 1) {
      res.status(200).json({
        code: "DELETE_SUCC",
        response: {
          id: req.body.id
        }
      });
    } else {
      res.status(200).json({
        code: "DELETE_FAIL",
        message: "ID doesn't exist"
      });
    }
  },
  login: async (req, res) => {
    console.log(req.body);
    let user = await model.user.findOne({ where: { email: req.body.email } });

    /**
     *  TODO Generate JW Token
     */

    if (!user) {
      res.status(404).json({
        code: "USER_NOT_FOUND",
        message: "User does not exist."
      });

      return;
    }

    if (!user.validPassword(req.body.password)) {
      res.status(403).json({
        code: "FORBIDDEN",
        message: "Password is incorrect"
      });

      res.end();
    } else {
      let token = Token.generateToken({ user: user.email });
      res.status(200).json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        code: "LOGGED_IN",
        message: "You are successfully logged in!!!",
        token: token
      });
    }
  },

  changePassword: async (req, res) => {
    let email = req.decodedToken.user;

    let user = await model.user.findOne({ where: { email: email } });

    if (!user.validPassword(req.body.currentPassword)) {
      res.status(403).json({
        code: "FORBIDDEN",
        message: "Password is incorrect"
      });

      return;
    }

    user.password = req.body.newPassword;

    let ChangedUser = await user.save();

    if (ChangedUser) {
      let token = Token.generateToken({ user: ChangedUser.email });
      res.status(200).json({
        code: "UPDATE_SUCC",
        toke: token,
        response: "Password is changed"
      });
    } else {
      res.status(403).json({
        code: "FORBIDDEN",
        message: "User is not authenticated"
      });
    }
  }
};
