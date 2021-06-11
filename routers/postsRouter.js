// Файл с роутингом по постам
const express = require('express');
const router = express.Router();

// Массив для хранения списка постов (в памяти)
const posts = [
  { id: '1', topic: 'Post title 1', text: 'Post text 1' },
  { id: '2', topic: 'Post title 2', text: 'Post text 2' },
  { id: '3', topic: 'Post title 3', text: 'Post text 3' },
];

// Получение списка постов
router.get('/', (req, res) => {
  res.json({ posts, status: 'success' });
});

// Получение поста по id (строка)
router.get('/:id', (req, res) => {
  const [post] = posts.filter(item => item.id === req.params.id);

  console.log(post);

  res.json({ post, status: 'success' });
});

// Создание поста
router.post('/', (req, res) => {
  const { topic, text } = req.body; // Достаем из тела запроса ключи

  // Формируем новый пост + добавляем в массив постов
  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });

  // Отдаем ответ после добавления
  res.json({
    status: 'success',
  });
});

// Изменение поста по id
router.post('/:id', (req, res) => {});

// Удаление поста по id
router.post('/:id', (req, res) => {});

module.exports = { postsRouter: router };
