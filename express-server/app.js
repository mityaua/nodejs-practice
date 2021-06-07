const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // Прослойка (миддлвар)

// Подключение роутов
const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');

// Записываем в переменную вызов фреймворка
const app = express();

// Подключение шаблонов EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Промежуточное ПО (мидлвары) - порядок важен!

// Кастомный мидлвар логирования (next - передать дальше)
app.use((req, res, next) => {
  const date = new Date();

  console.log(
    'Custom log:',
    `${req.method} ${req.url} ${date.toLocaleDateString()}`,
  );

  next();
});

// Подключение логгера + условие зависимости от окружения
process.env.NODE_ENV === 'development'
  ? app.use(logger('dev'))
  : app.use(logger('short'));

app.use(express.json({ limit: 100000 })); // Подключение json данных (с лимитом!)
app.use(express.urlencoded({ extended: false })); // Подключение обработки форм

app.use(cookieParser()); // Подключение куки парсера
app.use(express.static(path.join(__dirname, 'public'))); // Подключение публичной директории public

app.use('/', indexRouter);
app.use('/weather', weatherRouter);

// Формирование ошибки 404
app.use((req, res, next) => {
  next(createError(404, `По маршруту ${req.url} ничего не найдено`));
});

// Обработчик ошибок (важен порядок и количество параметров!)
app.use((err, req, res, next) => {
  // сохранение ошибок в переменную и вывод в зависимости от окружения (прод или дев режим)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // вывод статуса ошибки
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
