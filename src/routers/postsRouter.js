// Файл с путями
const express = require('express');
const router = new express.Router();

// Импорт валидации из отдельной папки
const {
  addPostValidation,
  patchPostValidation,
} = require('../middlewares/validationMiddleware');

// Импорт контроллеров
const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require('../controllers/postsController');

router.get('/', getPosts); // Роут для всех постов
router.get('/:id', getPostById); // Роут для получения поста по id
router.post('/', addPostValidation, addPost); // Роут для создания поста
router.put('/:id', addPostValidation, changePost); // Роут для изменения поста
router.patch('/:id', patchPostValidation, patchPost); // Для частичного измн.
router.delete('/:id', deletePost); // Роут для удаления поста

module.exports = {postsRouter: router};
