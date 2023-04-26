require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');

const { PORT, DB } = process.env;
const app = express();

mongoose.connect(DB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '644154810372fbd51ca18c35',
  };

  next();
});

app.post('/signin', login);
app.post('/singup', createUser);

app.use(router);
app.use(errorHandler);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {});
