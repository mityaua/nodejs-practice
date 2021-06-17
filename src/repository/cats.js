const Cat = require('../schemas/cats');

// Класс для работы с БД
class CatsRepository {
  constructor() {
    this.model = Cat;
  }

  // Запрашиваем всех котов из базы
  async getAll() {
    const results = await this.model.find({});
    return results;
  }

  // Запрашивает кота по id из базы
  async getById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  // Создаем нового кота в БД
  async create(body) {
    const result = await this.model.create(body);
    return result;
  }

  // Обновление данных о коте в БД
  async update(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );
    return result;
  }

  // Удаление кота в БД
  async remove(id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
    });

    return result;
  }
}

module.exports = CatsRepository;
