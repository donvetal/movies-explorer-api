const { celebrate, Joi } = require('celebrate');
const { validateLink } = require('../utils/validateLink');
const { messages } = require('../utils/constants');

module.exports.updateProfileValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(messages.invalidEmail),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(messages.invalidEmail),
    password: Joi.string().required().min(8),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(messages.invalidEmail),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateLink),
    trailer: Joi.string().required().custom(validateLink),
    thumbnail: Joi.string().required().custom(validateLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});
