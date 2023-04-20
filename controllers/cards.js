const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((allCards) => res.send(allCards))
    .catch((err) => res.status(400).send(err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch((err) => res.status(400).send(err));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((deletedCard) => res.send(deletedCard))
    .catch((err) => res.status(400).send(err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
