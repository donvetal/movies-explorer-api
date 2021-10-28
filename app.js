const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const corsOrigin = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoUrl } = require('./utils/config');

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
mongoose.connect(mongoUrl);
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(corsOrigin);
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT);
