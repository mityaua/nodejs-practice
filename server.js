// Настройка фреймворка Express для поднятия веб-сервера
const express = require('express');
const morgan = require('morgan');
const app = express();

// Пакет для работы с cors (кросс-доменными запросами)
const cors = require('cors');
// Пакет для автоматического считывания переменных из .env
require('dotenv').config();
// Пакет для работы с запросами
const got = require('got');

// Импорт маршрута из отдельного файла
// const { router } = require("./booksRouter");

// Переменная для хранения порта, ключа, урла
const PORT = process.env.PORT || 8081;
const API_KEY = process.env.API_KEY;
const BASE_URL = 'http://api.weatherbit.io/v2.0/current';

// Встроенный мидлвар для автоматической обработки JSON при отправке клиентом
app.use(express.json());
// Встроенный мидлвар для парстинга хтмл форм
app.use(express.urlencoded({ extended: true }));
// Встроенный мидлвара для публичной директории
app.use(express.static('public'));
// Внешний мидлвар для логирования
app.use(morgan('tiny'));
// Подключение мидлвара CORS
app.use(cors());
// Подключение маршрутов + наследование
// app.use("/api", router);

// Определяем маршруты (роутинг)
app.get('/api/weather', async (req, res) => {
  try {
    // req.query - query параметры в url
    // req.params - параметр динамеческого url
    // req.body - данные с запроса (post, patch и т.д), с форм
    // req.headers - метаданные

    const { lat, lon } = req.query;

    // Примитивная валидация query параметра lat
    if (!lat) {
      return res
        .status(400)
        .json({ message: 'latitude parameter is required' });
    }

    // Примитивная валидация query параметра lon
    if (!lon) {
      return res
        .status(400)
        .json({ message: 'longitude parameter is required' });
    }

    const response = await got(BASE_URL, {
      searchParams: {
        key: API_KEY,
        lat,
        lon,
      },
      responseType: 'json',
    });

    const [weatherData] = response.body.data;

    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;

    res.json({ city_name, description, temp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Вешаем слушателя на порт
app.listen(PORT, error => {
  if (error) console.error('Error at server launch:', error);

  console.log(`Server works at ${PORT}`);
});
