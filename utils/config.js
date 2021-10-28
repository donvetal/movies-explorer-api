const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const mongoUrl = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  secretKey,
  mongoUrl,
};
