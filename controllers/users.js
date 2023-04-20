const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((allUsers) => {
      res.send(allUsers);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getUserById = (req, res) => {
  const Id = req.params.id;

  User.findById(Id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
