import { Types } from "mongoose";

import { EGender } from "../enums/gender.enum";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  age: number;
  gender: EGender;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
