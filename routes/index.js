const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/user');
const { loginValidator, createUserValidator } = require('../middlewares/validations');

router.post('/signin', loginValidator, login);

router.post('/signup', createUserValidator, createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.get('/signout', logout);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Извините, страница не найдена!'));
});
module.exports = router;
