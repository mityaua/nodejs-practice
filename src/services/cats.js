// Сервис для кошек (логика)
const { CatsRepository } = require('../repository');

class CatsService {
  constructor() {
    this.repository = {
      cats: new CatsRepository(),
    };
  }

  async getAll() {
    const data = await this.repository.cats.getAll();
    return data;
  }

  async getById({ id }) {
    const data = await this.repository.cats.getById(id);
    return data;
  }

  async create(body) {
    const data = await this.repository.cats.create(body);
    return data;
  }

  async update({ id }, body) {
    const data = await this.repository.cats.update(id, body);
    return data;
  }

  async remove({ id }) {
    const data = await this.repository.cats.remove(id);
    return data;
  }
}

module.exports = CatsService;
