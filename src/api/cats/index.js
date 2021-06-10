// Индексный файл для роутов кошек (формирование маршрутов)
const express = require('express'); // импорт закешированного сервера
const router = express.Router(); // инициализация роутов
const controllerCats = require('../../controllers/cats'); // импорт контроллеров

// Роутинг для кошек (получение всех, по ай ди, создание, замена, обновление, удаление)
// Методы запросов + отдельно коллбеки внутри controllerCats
router
  .get('/', controllerCats.getAll)
  .get('/:id', controllerCats.getById)
  .post('/', controllerCats.create)
  .put('/:id', controllerCats.update)
  .patch('/:id/vaccinated', controllerCats.updateStatus)
  .delete('/:id', controllerCats.remove);

module.exports = router;
