import * as Joi from 'joi';

export const newMeditationSchema = Joi.object()
  .keys({
    category: Joi.string().required(),
    name: Joi.object().keys({
      ru: Joi.string(),
      uk: Joi.string(),
    }),
    isWaiting: Joi.bool(),
    description: Joi.object().keys({
      ru: Joi.string(),
      uk: Joi.string(),
    }),
    video: Joi.string(),
    cover: Joi.string(),
    price: Joi.string(),
    status: Joi.string(),
  })
  .unknown(false);

export const updateMeditationSchema = Joi.object()
  .keys({
    category: Joi.string().required(),
    name: Joi.object().keys({
      ru: Joi.string().required(),
      uk: Joi.string().required(),
    }),
    isWaiting: Joi.bool().required(),
    description: Joi.object().keys({
      ru: Joi.string().required(),
      uk: Joi.string().required(),
    }),
    video: Joi.string().required(),
    cover: Joi.string().required(),
    price: Joi.string().required(),
    status: Joi.string().required(),
  })
  .unknown(false);
