const cors = require('cors');

const corsOptions = {
  origin: [
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  credentials: true,
};

const corsOrigin = cors(corsOptions);

module.exports = corsOrigin;
