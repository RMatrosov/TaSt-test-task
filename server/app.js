require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors')
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const NotFoundError = require('./errors/NotFoundError');

const { PASSWORD,DB_USER } = process.env;

const { PORT = 3002 } = process.env;

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');

mongoose.connect(`mongodb+srv://admin:admin@cluster0.fh53g.mongodb.net/userCabinet?retryWrites=true&w=majority`);

app.use(helmet());
app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
