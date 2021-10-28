const cors = require('cors');

const corsOptions = {
  origin: [
    'http://kino-explorer.nomoredomains.club',
    'https://kino-explorer.nomoredomains.club',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  credentials: true,
};

const corsOrigin = cors(corsOptions);

module.exports = corsOrigin;
