// Контроллер для кошек (формирование ответов)
const { HttpCode } = require('../helpers/constans'); // Импорт констант со статусами
const { CatsService } = require('../services'); // Импорт сервисов

const catsService = new CatsService(); // экземпляр от класса

// Список методов (обработчиков маршрутов) - только формируют ответ

// Метод для ответа на запрос по всем кошкам
const getAll = (req, res, next) => {
  try {
    const cats = catsService.getAll();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        cats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Метод для ответа на запрос по id кошки
const getById = (req, res, next) => {
  try {
    const cat = catsService.getById(req.params);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

// Метод для создания кошки
const create = (req, res, next) => {
  try {
    const cat = catsService.create(req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        cat,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Метод для полного обновления данных о кошке
const update = (req, res, next) => {
  try {
    const cat = catsService.update(req.params, req.body);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

// Метод для частичного обновления данных (статуса кошки)
const updateStatus = (req, res, next) => {
  try {
    const cat = catsService.update(req.params, req.body);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

// Метод для удаления кошки
const remove = (req, res, next) => {
  try {
    const cat = catsService.remove(req.params);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
