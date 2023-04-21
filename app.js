const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '644154810372fbd51ca18c35',
  };

  next();
});

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('start server');
});
