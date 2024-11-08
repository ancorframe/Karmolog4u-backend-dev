import * as Joi from 'joi';

export const UpdateAdminUserSchema = Joi.object()
  .keys({
    firstName: Joi.string().min(3).optional(),
    lastName: Joi.string().min(3).optional(),
    phone: Joi.string().min(3).optional(),
    avatarUrl: Joi.string().min(3).optional(),
    role: Joi.array().optional(),
    supplies: Joi.array().optional(),
    banned: Joi.boolean().optional(),
  })
  .unknown(false);
