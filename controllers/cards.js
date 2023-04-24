const Card = require('../models/card');
const NotFoundError = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((allCards) => res.send(allCards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((deletedCard) => {
      if (deletedCard) {
        res.send(deletedCard);
      }
      throw new NotFoundError('Карточки с таким ID нет');
    })
    .catch(next);
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
    .catch(next);
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
      throw new NotFoundError('Карточки с таким ID нет');
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
