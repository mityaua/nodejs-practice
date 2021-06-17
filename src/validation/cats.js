// Валидация данных на входе (вынесено в отдельный файл)
const Joi = require('joi');
const { HttpCode } = require('../helpers/constans'); // Импорт констант со статусами

// Валидация создания кота
const schemaCreateCat = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  age: Joi.number().integer().min(1).max(40).required(),
  features: Joi.array().optional(),
  owner: Joi.object().optional(),
  isVaccinated: Joi.boolean().optional(),
});

// Валидация обновления всего кота
const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  age: Joi.number().integer().min(1).max(40).optional(),
  features: Joi.array().optional(),
  owner: Joi.object().optional(),
  isVaccinated: Joi.boolean().optional(),
});

// Валидация обновления статуса вакцины кота
const schemaUpdateStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

// Обработка ошибок валидаций
const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field ${message.replace(/"/g, '')}`,
      data: 'Bad request',
    });
  }

  next();
};

module.exports.validateCreateCat = (req, res, next) => {
  return validate(schemaCreateCat, req.body, next);
};

module.exports.validateUpdateCat = (req, res, next) => {
  return validate(schemaUpdateCat, req.body, next);
};

module.exports.validateUpdateStatusCat = (req, res, next) => {
  return validate(schemaUpdateStatusCat, req.body, next);
};
