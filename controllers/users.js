const User = require('../models/user');
const NotFoundError = require('../errors/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((allUsers) => res.send(allUsers))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send(user);
      }
      throw new NotFoundError('Пользователя с таким ID нет');
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => next(err));
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
