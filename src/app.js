const express = require('express'); // Импорт библиотеки экспресс сервера
const cors = require('cors'); // Импорт библиотеки CORS

const app = express(); // Инициализация экспресс приложения

const { HttpCode } = require('./helpers/constans'); // Импорт констант для статусов запросов
const routerCats = require('./api/cats'); // Импорт роутеров из папки кошек

app.use(cors()); // Подключение мидлвара для CORS
app.use(express.json()); // Подключение мидлвара для обработки JSON

app.use('/api/cats', routerCats); // Подключение мидлвара для роута кошек

// Обработчик ошибок NOT FOUND (если не заматчились остальные url)
app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/cats`,
    data: 'Not found',
  });
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;

  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

// Устанавливаем порт для приложения
const PORT = process.env.PORT || 3000;

// Слушатель сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Server running. Use API on port ${PORT}`);
});
