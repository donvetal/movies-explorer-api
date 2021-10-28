const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/config');
const UnauthorizedErr = require('../errors/unauthorized-err');
const { messages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedErr(messages.unAuthorized);
  }
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new UnauthorizedErr(messages.unAuthorized);
  }
  req.user = payload;
  next();
};
