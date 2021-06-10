// Файл для работы с базой данных (инкапсуляция)
const { v4: uuid } = require('uuid'); // Импорт библиотеки для генерации уникальных ID

const db = require('../db'); // Импорт файла для работы c базой

// Класс для работы с БД
class CatsRepository {
  // Запрашиваем всех котов из базы
  getAll() {
    return db.get('cats').value();
  }

  // Запрашивает кота по id из базы
  getById(id) {
    return db.get('cats').find({ id }).value();
  }

  // Создаем нового кота в БД
  create(body) {
    const id = uuid();

    const record = {
      id,
      ...body,
      ...(body.isVaccinated ? {} : { isVaccinated: false }),
    };

    db.get('cats').push(record).write(); // Добавление в БД сущности

    return record;
  }

  // Обновление данных о коте в БД + возврат назад
  update(id, body) {
    const record = db.get('cats').find({ id }).assign(body).value();
    db.write();
    return record.id ? record : null;
  }

  // Удаление кота в БД
  remove(id) {
    const [record] = db.get('cats').remove({ id }).write();
    return record;
  }
}

module.exports = CatsRepository;
