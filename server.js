// Настройка фреймворка Express для поднятия веб-сервера
const express = require("express");
const morgan = require("morgan");
const app = express();

// Переменная для хранения порта
const PORT = 8081;

// Встроенный мидлвар для автоматической обработки JSON при отправке клиентом
app.use(express.json());
// Встроенный мидлвар для парстинга хтмл форм
app.use(express.urlencoded({ extended: true }));
// Встроенный мидлвара для публичной директории
app.use(express.static("public"));
// Внешний мидлвар для логирования
app.use(morgan("tiny"));

// Пример кастомного мидлвара - логгера (важен порядок!)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next(); // передаем обработку дальше
});

// Определяем маршруты (роутинг)
app.get("/home", (req, res) => {
  res.send("get request");
});

// Пример пост запроса
app.post("/home", (req, res) => {
  console.log(req.body);
  res.json({ x: 1, body: req.body });
});

// Пример ответа на все запросы, которые не заматчились (важен порядок)
app.use((req, res) => {
  res.json({ obj: "example" });
});

// Вешаем слушателя на порт
app.listen(PORT, (error) => {
  if (error) console.error("Error at server launch:", error);

  console.log(`Server works at ${PORT}`);
});
