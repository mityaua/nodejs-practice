const express = require('express');
const morgan = require('morgan');
require('dotenv').config(); // Пакет для автоматического считывания переменных из .env

const app = express(); // Инициализация приложения

const { postsRouter } = require('./src/routers/postsRouter'); // Импорт роутов с постами

const PORT = process.env.PORT || 8081; // Переменная для хранения порта, ключа, урла

app.use(express.json()); // Мидлвар для парсинга JSON юзера
app.use(morgan('tiny')); // Внешний мидлвар для логирования

app.use('/api/posts', postsRouter); // Подключение маршрутов

// Вешаем слушателя на порт
app.listen(PORT, error => {
  if (error) console.error('Error at server launch:', error);

  console.log(`Server works at ${PORT}`);
});
