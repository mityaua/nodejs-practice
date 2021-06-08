const express = require('express');
const router = express.Router();
const got = require('got'); // импорт библиотеки для работы с http запросами
const { query, validationResult } = require('express-validator'); // импорт библиотеки валидации
require('dotenv').config(); // импорт пакета для хранения переменных окружения (файлы .env и .env.example)

// Роутинг на /weather + валидация долготы-ширины
router.get(
  '/',
  [query('lat').isNumeric(), query('lon').isNumeric()],
  (req, res, next) => {
    // Обработка ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    const { lat, lon } = req.query; // деструктуризация query-параметров из запроса на бекенд

    try {
      // Делаем запрос на погодный API с параметрами
      const response = await got(
        'http://api.openweathermap.org/data/2.5/weather',
        {
          searchParams: {
            lat,
            lon,
            appid: process.env.API_KEY,
          },
        },
      );

      const {
        weather: [weather],
        wind,
        name,
        sys: { country },
      } = JSON.parse(response.body); // парсим тело ответа и деструктурируем нужные данные

      res.json({
        country,
        name,
        weather,
        wind,
      }); // отвечаем с бекенда данными в нужном нам порядке
    } catch (error) {
      next(error); // перекидываем ошибку в обработчик (внутри app.js)
    }
  },
);

module.exports = router;
