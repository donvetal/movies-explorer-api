const Movie = require('../models/movie');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');
const { messages } = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  Movie.findOne({
    owner: req.user._id,
    movieId: req.body.movieId,
  })
    .then((movie) => {
      if (movie) {
        return next(new ConflictErr(messages.movie.conflict));
      }
      return Movie.create({ ...req.body, owner: req.user._id })
        .then((newMovie) => res.send({ data: newMovie }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr(messages.badRequest));
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
        return next(new NotFoundErr(messages.movie.notFoundMovie));
      }
      if (movie.owner.toString() === req.user._id.toString()) {
        return movie.remove()
          .then(() => res.status(200).send({ message: movie }));
      }
      return next(new ForbiddenErr(messages.movie.forbidden));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr(messages.badRequest));
      }
      return next(err);
    });
};
