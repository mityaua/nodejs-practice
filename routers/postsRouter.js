// Файл с роутингом по постам
const express = require('express');
const router = express.Router();

// Массив для хранения списка постов (в памяти)
let posts = [
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
  const { id } = req.params;
  const [post] = posts.filter(item => item.id === id);

  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id ${id} found` });
  }

  res.json({ post, status: 'success' });
});

// Создание поста
router.post('/', (req, res) => {
  const { topic, text } = req.body; // Достаем из тела запроса ключи

  // Формируем новый пост
  const newPost = {
    id: new Date().getTime().toString(),
    topic,
    text,
  };

  // Добавляем новый пост в массив постов
  posts = [...posts, newPost];

  // Отдаем ответ после добавления
  res.json({
    status: 'success',
  });
});

// Изменение поста по id
router.put('/:id', (req, res) => {
  const { topic, text } = req.body; // Достаем из тела запроса ключи

  // Проходимся по массиву постов с условием - если ай ди равно, тогда переписываем ключи
  posts.forEach(post => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });

  res.json({ status: 'success' });
});

// Частичное изменение поста по id
router.patch('/:id', (req, res) => {
  const { topic, text } = req.body; // Достаем из тела запроса ключи

  // Проходимся по массиву постов с условием - если ай ди равно, тогда только нужные ключи
  posts.forEach(post => {
    if (post.id === req.params.id) {
      if (topic) {
        post.topic = topic;
      }

      if (text) {
        post.text = text;
      }
    }
  });

  res.json({ status: 'success' });
});

// Удаление поста по id
router.delete('/:id', (req, res) => {
  posts = posts.filter(item => item.id !== req.params.id); // Записываем результат фильтра в let posts

  res.json({ status: 'success' });
});

module.exports = { postsRouter: router };
