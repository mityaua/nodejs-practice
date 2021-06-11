// Контроллеры - логика обработки маршрутов

// Массив для хранения списка постов (в памяти)
let posts = [
  { id: '1', topic: 'Post title 1', text: 'Post text 1' },
  { id: '2', topic: 'Post title 2', text: 'Post text 2' },
  { id: '3', topic: 'Post title 3', text: 'Post text 3' },
];

// Получение всех постов
const getPosts = (req, res) => {
  res.json({ posts, status: 'success' });
};

// Получение поста по id (строка)
const getPostById = (req, res) => {
  const { id } = req.params;
  const [post] = posts.filter(item => item.id === id);

  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id ${id} found` });
  }

  res.json({ post, status: 'success' });
};

// Создание поста
const addPost = (req, res) => {
  const { topic, text } = req.body; // Достаем из тела запроса ключи

  // Добавляем новый пост в массив постов
  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });

  // Отдаем ответ после добавления
  res.json({
    status: 'success',
  });
};

// Изменение всего поста по id
const changePost = (req, res) => {
  const { topic, text } = req.body; // Достаем из тела запроса ключи

  // Проходимся по массиву постов с условием - если ай ди равно, тогда переписываем ключи
  posts.forEach(post => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });

  res.json({ status: 'success' });
};

// Частичное изменение поста по id
const patchPost = (req, res) => {
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
};

// Удаление поста по id
const deletePost = (req, res) => {
  posts = posts.filter(item => item.id !== req.params.id); // Записываем результат фильтра в let posts

  res.json({ status: 'success' });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
