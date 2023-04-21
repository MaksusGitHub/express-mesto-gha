const httpStatus = require('http-status');
const mongoose = require('mongoose');
const NotFoundError = require('./errors');

const errorHandler = (err, req, res, next) => {
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

  return res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: `Произошла ошибка: ${err.message}` });
};

module.exports = errorHandler;
