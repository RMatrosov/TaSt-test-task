const router = require('express').Router();
const validator = require('validator');
const {celebrate, Joi} = require('celebrate');
const {
  getCards, deleteCard, createCard,changeCardInfo
} = require('../controllers/cards');


router.get('/cards', getCards);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required(),
  }),
}), deleteCard);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    link: Joi.string().custom(((value, helpers) => {
      if (validator.isURL(value, {require_protocol: true})) {
        return value;
      }
      return helpers.message('передайте ссылку');
    })),
  }),
}), createCard);

router.patch('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    link: Joi.string().required().custom(((value, helpers) => {
      if (validator.isURL(value, {require_protocol: true})) {
        return value;
      }
      return helpers.message('передайте ссылку');
    })),
  }),
}), changeCardInfo);



module.exports = router;
