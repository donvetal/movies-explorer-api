const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/config');
const UnauthorizedErr = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedErr('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new UnauthorizedErr('Необходима авторизация');
  }
  req.user = payload;
  next();
};
