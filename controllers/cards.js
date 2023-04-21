const Card = require('../models/card');
const NotFoundError = require('../errors');

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
    .then((deletedCard) => res.send(deletedCard))
    .catch(() => next(new NotFoundError('Карточки с таким Id не существует')));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => next(new NotFoundError('Карточки с таким Id не существует')));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => next(new NotFoundError('Карточки с таким Id не существует')));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
