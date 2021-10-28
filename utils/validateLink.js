const validator = require('validator');
const BadRequestErr = require('../errors/bad-request-err');
const { messages } = require('./constants');

module.exports.validateLink = (value) => {
  const result = validator.isURL(value);
  if (result) return value;
  throw new BadRequestErr(messages.invalidUrl);
};
