// Контроллеры - логика обработки маршрутов
const ObjectId = require('mongodb').ObjectID;

// Получение всех постов
const getPosts = async (req, res) => {
  const posts = await req.db.Posts.find({}).toArray();
  res.json({posts});
};

// Получение поста по id (строка)
const getPostById = async (req, res) => {
  const {id} = req.params;
  const post = await req.db.Posts.findOne({_id: new ObjectId(id)});
  if (!post) {
    return res
        .status(400)
        .json({status: `failure, no post with id ${id} found`});
  }
  res.json({post, status: 'success'});
};

// Создание поста
const addPost = async (req, res) => {
  const {topic, text} = req.body; // Достаем из тела запроса ключи

  await req.db.Posts.insertOne({topic, text});

  // Отдаем ответ после добавления
  res.json({
    status: 'success',
  });
};

// Изменение всего поста по id
const changePost = async (req, res) => {
  const {id} = req.params;

  const {topic, text} = req.body; // Достаем из тела запроса ключи

  await req.db.Posts.updateOne(
      {_id: new ObjectId(id)},
      {$set: {topic, text}},
  );

  res.json({status: 'success'});
};

// Удаление поста по id
const deletePost = async (req, res) => {
  const {id} = req.params;

  await req.db.Posts.deleteOne({_id: new ObjectId(id)});
  res.json({status: 'success'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
};
