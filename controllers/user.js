const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { JWT_SECRET = 'dev-secret' } = process.env;

const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(201).send({
      data: {
        email, name, _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Некорректные данные '));
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictErr('Конфликт, такой email уже существует.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // вернём токен
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        // sameSite: 'none',
        // secure: true,
      });
      res.status(200).send({ message: 'Авторизация прошла успешно!' });
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь по указанному _id не найден.');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Невалидный id'));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь по указанному _id не найден.');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Невалидный id'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Некорректные данные'));
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictErr('Конфликт, такой email уже существует.'));
      }
      return next(err);
    });
};
module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли!' });
};
module.exports.successfulAuth = (req, res) => {
  res.send({ message: 'Вы авторизованы!' });
};
