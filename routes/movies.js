const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validations');

router.get('/', getMovies);

router.post('/', createMovieValidator, createMovie);

router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
