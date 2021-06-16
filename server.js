const express = require('express');
const morgan = require('morgan');
require('dotenv').config(); // Пакет для считывания переменных из .env

const app = express(); // Инициализация приложения

const {connectMongo} = require('./src/db/connection'); // Подключение к БД
const {postsRouter} = require('./src/routers/postsRouter'); // Импорт роутов

const PORT = process.env.PORT || 8081; // Переменная для хранения порта

app.use(express.json()); // Мидлвар для парсинга JSON юзера
app.use(morgan('tiny')); // Внешний мидлвар для логирования

app.use('/api/posts', postsRouter); // Подключение маршрутов

// Кастомный обработчик ошибок
app.use((error, req, res, next) => {
  res.status(500).json({message: error.message});
});

// Подключение к базе + старт сервера
const start = async () => {
  try {
    await connectMongo();

    // Вешаем слушателя на порт
    app.listen(PORT, (error) => {
      if (error) console.error('Error at server launch:', error);

      console.log(`Server works at ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch app with error: ${error.message}`);
  }
};

start();
