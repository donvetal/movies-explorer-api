const { messages } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  // проверяем статус и выставляем сообщение в зависимости от него
  res.status(statusCode).send({ message: statusCode === 500 ? messages.serverError : message });
  next();
};
