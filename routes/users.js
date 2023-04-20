const usersRouter = require('express').Router();
const { createUser, getUserById, getUsers } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);

module.exports = usersRouter;
