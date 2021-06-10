// Сервис для кошек (логика)

const { CatsRepository } = require('../repository');

class CatsService {
  constructor() {
    this.repository = {
      cats: new CatsRepository(),
    };
  }

  getAll() {
    const data = this.repository.cats.getAll();
    return {};
  }

  getById({ id }) {
    return {};
  }

  create(body) {
    return {};
  }

  update({ id }, body) {
    return {};
  }

  remove({ id }) {
    return;
  }
}

module.exports = CatsService;
