const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((allCards) => res.send(allCards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch((err) => next(err));
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((deletedCard) => {
      if (deletedCard) {
        res.send(deletedCard);
      }
      throw new NotFoundError('Карточки с таким ID нет');
    })
    .catch((err) => {
      if (err instanceof (mongoose.Error.CastError || mongoose.Error.ValidationError)) {
        next(err);
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      }
      throw new NotFoundError('Карточки с таким ID нет');
    })
    .catch((err) => {
      if (err instanceof (mongoose.Error.CastError || mongoose.Error.ValidationError)) {
        next(err);
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      }
      throw new NotFoundError('Карточки с таким Id нет');
    })
    .catch((err) => {
      if (err instanceof (mongoose.Error.CastError || mongoose.Error.ValidationError)) {
        next(err);
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
