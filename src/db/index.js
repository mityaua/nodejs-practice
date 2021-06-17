// Файл для подключения к базе данных
const mongoose = require('mongoose');
require('dotenv').config();
const uriDb = process.env.MONGO_URL;

const db = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

// Консолит подключение к базе
mongoose.connection.on('connected', err => {
  console.log('Mongoose connected');
});

// Обработка ошибки при коннекте
mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.messege}`);
});

// Консолит отключение от базы
mongoose.connection.on('disconnected', err => {
  console.log(`Mongoose connection error: ${err.messege}`);
});

// Отключение от базы при событии SIGINT (ctrl + C)
process.on('SIGINT', async () => {
  console.log('Connection for DB disconnected and app terminated');
  process.exit(1);
});

module.exports = db;
