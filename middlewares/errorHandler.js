const httpStatus = require('http-status');
const mongoose = require('mongoose');
const NotFoundError = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND)
      .send({ message: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(httpStatus.BAD_REQUEST)
      .send({ message: 'Данные не прошли валидацию' });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(httpStatus.BAD_REQUEST)
      .send({ message: 'Некорректный формат входных данных' });
  }
  if (err instanceof mongoose.Error.NotFoundError) {
    return res.status(httpStatus.NOT_FOUND)
      .send({ message: 'Страница не найдена' });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: `Произошла ошибка: ${err.message}` });
};

module.exports = errorHandler;
