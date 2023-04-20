const router = require('express').Router();
const usersRouter = require('./users');

router.use('/users', usersRouter);
// router.use('cards', cardsRouter);

module.exports = router;
