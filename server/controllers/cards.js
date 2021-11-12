const Card = require('../models/card');
const NotValidId = require('../errors/NotValidId');
const CastError = require('../errors/CastError');
const ValidationError = require('../errors/ValidationError');


const getCards = (req, res, next) => {
  Card.find({}).then((cards) => {
    res.send({data: cards});
  }).catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({data: card});
    }).catch((err) => {
    if (err.name === 'CastError') {
      throw new CastError(' Переданы некорректные данные');
    }
    next(err);
  })
    .catch(next);
};

const createCard = (req, res, next) => {
  console.log(req.body)
  Card.create({...req.body})
    .then((card) => {
      res.send({data: card});
    }).catch((err) => {
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные при создании карточки');
    }
    next(err);
  })
    .catch(next);
};

const changeCardInfo = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {...req.body},
    {new: true, runValidators: true})
    .then((card) => {
      if (!card) {
        throw new NotValidId('Нет пользователя с таким id');
      }
      res.send({data: card});
    }).catch((err) => {
    if (err.name === 'CastError') {
      throw new CastError('Переданы некорректные данные при создании пользователя');
    }
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные');
    }
    next(err);
  })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  changeCardInfo,
};
