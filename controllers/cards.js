const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const AccessRightsError = require('../errors/AccessRightsError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('likes')
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
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким ID нет');
      }
      if (String(card.owner) !== req.user._id) {
        throw new AccessRightsError('Нет доступа к этой карточке');
      }
      Card.findByIdAndRemove(req.params.id)
        .populate('likes')
        .then((deletedCard) => {
          res.send(deletedCard);
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
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
    .populate('likes')
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
