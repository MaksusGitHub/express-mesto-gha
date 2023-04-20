const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((allCards) => {
      res.send(allCards);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteCardById = (req, res) => {
  const Id = req.params.id;

  Card.findByIdAndRemove(Id)
    .then((deletedCard) => {
      res.send(deletedCard);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
};
