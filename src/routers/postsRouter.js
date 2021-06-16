// Файл с путями
const express = require('express');
const router = new express.Router();

// Импорт валидации из отдельной папки
const {addPostValidation} = require('../middlewares/validationMiddleware');

// Импорт универсального трай кетча
const {asyncWrapper} = require('../helpers/apiHelpers');

// Импорт контроллеров
const modelsMiddlewares = require('../middlewares/models');

// Импорт контроллеров
const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require('../controllers/postsController');

router.use(modelsMiddlewares);

router.get('/', asyncWrapper(getPosts)); // Роут для всех постов
router.get('/:id', asyncWrapper(getPostById)); // полученияе поста по id
router.post('/', addPostValidation, asyncWrapper(addPost)); // создание поста
router.put('/:id', addPostValidation, asyncWrapper(changePost)); // измен. поста
router.delete('/:id', asyncWrapper(deletePost)); // удаление поста

module.exports = {postsRouter: router};
