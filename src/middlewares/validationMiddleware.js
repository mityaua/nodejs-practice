// Мидлвар для валидации
const Joi = require('joi');

module.exports = {
  addPostValidation: (req, res, next) => {
    // Определение схемы валидации данных
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().alphanum().min(10).max(300).required(),
    });

    // Записываем в переменную результат валидации
    const validationResult = schema.validate(req.body);

    // Обрабатываем ошибку валидации
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    next();
  },

  patchPostValidation: (req, res, next) => {
    // Определение схемы валидации данных
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).optional(),
      text: Joi.string().alphanum().min(10).max(300).optional(),
    });

    // Записываем в переменную результат валидации
    const validationResult = schema.validate(req.body);

    // Обрабатываем ошибку валидации
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    next();
  },
};
