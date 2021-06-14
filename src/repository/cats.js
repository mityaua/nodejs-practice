const { ObjectID } = require('mongodb');
const { HttpCode } = require('../helpers/constans');
const { ErrorHandler } = require('../helpers/errorHandler');

// Класс для работы с БД
class CatsRepository {
  constructor(client) {
    this.collection = client.db().collection('cats');
  }

  // Приватный метод для получения id
  #getMongoId(id) {
    try {
      return ObjectID(id);
    } catch (e) {
      throw new ErrorHandler(
        HttpCode.BAD_REQUEST,
        `Mongo _id: ${e.message}`,
        'Bad Request',
      );
    }
  }

  // Запрашиваем всех котов из базы
  async getAll() {
    const results = await this.collection.find().toArray();
    return results;
  }

  // Запрашивает кота по id из базы
  async getById(id) {
    try {
      const objectId = this.#getMongoId(id);
      const [result] = await this.collection.find({ _id: objectId }).toArray();
      return result;
    } catch (e) {
      e.status = 400;
      e.data = 'Bad request';
      throw e;
    }
  }

  // Создаем нового кота в БД
  async create(body) {
    const record = {
      ...body,
      ...(body.isVaccinated ? {} : { isVaccinated: false }),
    };

    const {
      ops: [result],
    } = await this.collection.insertOne(record);

    return result;
  }

  // Обновление данных о коте в БД + возврат назад
  async update(id, body) {
    const objectId = this.#getMongoId(id);

    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnOriginal: false },
    );

    return result;
  }

  // Удаление кота в БД
  async remove(id) {
    const objectId = this.#getMongoId(id);

    const { value: result } = await this.collection.findOneAndDelete({
      _id: objectId,
    });

    return result;
  }
}

module.exports = CatsRepository;
