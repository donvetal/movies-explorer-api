const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');
const { messages } = require('../utils/constants');
const {
  login, createUser, logout, successfulAuth,
} = require('../controllers/user');
const { loginValidator, createUserValidator } = require('../middlewares/validations');

router.post('/signin', loginValidator, login);

router.post('/signup', createUserValidator, createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.get('/signout', logout);
router.get('/check-auth', successfulAuth);
router.all('*', (req, res, next) => {
  next(new NotFoundError(messages.notFoundPage));
});
module.exports = router;
