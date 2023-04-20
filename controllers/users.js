const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.send(allUsers))
    .catch((err) => res.status(400).send(err));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => res.status(400).send(err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
