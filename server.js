// Настройка фреймворка Express для поднятия веб-сервера
const express = require("express");
const morgan = require("morgan");
const app = express();

// Пакет для автоматического считывания переменных из .env
require("dotenv").config();

// Пакет для работы с запросами
const got = require("got");

// Импорт маршрута из отдельного файла
const { router } = require("./booksRouter");

// Переменная для хранения порта, ключа, урла
const PORT = process.env.PORT || 8081;
const API_KEY = process.env.API_KEY;
const BASE_URL = "http://api.weatherbit.io/v2.0/current";

// Встроенный мидлвар для автоматической обработки JSON при отправке клиентом
app.use(express.json());
// Встроенный мидлвар для парстинга хтмл форм
app.use(express.urlencoded({ extended: true }));
// Встроенный мидлвара для публичной директории
app.use(express.static("public"));
// Внешний мидлвар для логирования
app.use(morgan("tiny"));
// Подключение маршрутов + наследование
// app.use("/api", router);

// Определяем маршруты (роутинг)
app.get("/api/weather", async (req, res) => {
  try {
    const response = await got(BASE_URL, {
      searchParams: {
        key: "ea41bc3d393b41638cdd827b88acf3ef",
        lat: "50.4670243",
        lon: "30.3507212",
      },
      responseType: "json",
    });

    res.json({ response: response.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Вешаем слушателя на порт
app.listen(PORT, (error) => {
  if (error) console.error("Error at server launch:", error);

  console.log(`Server works at ${PORT}`);
});
