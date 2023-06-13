import Joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGender } from "../enums/gender.enum";

export class UserValidator {
  static username = Joi.string().min(3).max(12);
  static age = Joi.number().min(1).max(199);
  static gender = Joi.valid(...Object.values(EGender));
  static email = Joi.string().email().regex(regexConstants.EMAIL).trim().lowercase();
  static password = Joi.string().regex(regexConstants.PASSWORD);

  static create = Joi.object({
    name: this.username.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    name: this.username,
    age: this.age,
    gender: this.gender,
  });
}
