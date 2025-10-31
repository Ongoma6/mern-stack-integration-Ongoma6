import Joi from 'joi';

export const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().min(2).max(50).required(),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  });
  return schema.validate(data);
};

export const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required()
  });
  return schema.validate(data);
};