import * as Joi from 'joi';

export const UpdateUserSchema = Joi.object()
  .keys({
    fullName: Joi.string().min(3).optional(),
    // lastName: Joi.string().min(3).optional(),
    mobPhone: Joi.string().min(3).optional(),
    password: Joi.string().min(3).optional(),
    // avatarUrl: Joi.string().min(3).optional(),
  })
  .unknown(false);
