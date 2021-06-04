const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const { users } = require('../data/users.json');

// Обрабатываем главную страницу
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home page' });
});

// Обрабатываем страницу обратной связи
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact' });
});

// Обрабатываем форму обратной связи + записываем данные в файл
router.post('/contact', async (req, res, next) => {
  await fs.writeFile(
    path.join(__dirname, '..', 'data', 'message.json'),
    JSON.stringify(req.body, null, 2),
  );
  res.redirect('/');
});

// Обрабатываем блог + передаем json для обработки в шаблоне
router.get('/blog', (req, res, next) => {
  res.render('blog', { title: 'Blog', users });
});

module.exports = router;
