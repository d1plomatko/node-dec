import Joi from "joi";

const userValidator = Joi.object({
  name: Joi.string().min(3).max(12).required(),
  age: Joi.number().min(0).max(100).required(),
});

export { userValidator };
