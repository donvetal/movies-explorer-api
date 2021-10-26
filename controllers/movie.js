const Movie = require('../models/movie');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');

module.exports.createMovie = (req, res, next) => {
  Movie.findOne({
    owner: req.user._id,
    movieId: req.body.movieId,
  })
    .then((movie) => {
      if (movie) {
        return next(new ConflictErr('Такой фильм уже существует'));
      }
      return Movie.create({ ...req.body, owner: req.user._id })
        .then((newMovie) => res.send({ data: newMovie }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Некорректные данные '));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundErr('Нет фильма по заданному id'));
      }
      if (movie.owner.toString() === req.user._id.toString()) {
        return Movie.findByIdAndRemove(req.params.id)
          .then(() => res.status(200).send({ message: 'Фильм удален!' }));
      }
      return next(new ForbiddenErr('Нет прав для удаления данного фильма!'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Некорректные данные '));
      }
      return next(err);
    });
};
