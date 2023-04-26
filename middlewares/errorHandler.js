const httpStatus = require('http-status');
const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const AccessRightsError = require('../errors/AccessRightsError');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof AuthError) {
    return res.status(err.statusCode)
      .send({ message: err.message });
  }
  if (err instanceof AccessRightsError) {
    return res.status(err.statusCode)
      .send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode)
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
    .send({ message: 'На сервере произошла ошибка' });
};

module.exports = errorHandler;
