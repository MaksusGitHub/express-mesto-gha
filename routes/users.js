const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getProfile);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
