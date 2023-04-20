const cardsRouter = require('express').Router();

const { getCards, createCard, deleteCardById } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCardById);

module.exports = cardsRouter;
